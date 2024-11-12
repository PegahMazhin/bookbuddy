import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Profile from './Profile';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUserData();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>BookBuddy</h1>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <nav>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </nav>
          )}
        </header>

        <Switch>
          <Route exact path="/">
            <BooksList token={token} />
          </Route>

          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login setToken={setToken} setUser={setUser} />}
          </Route>

          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register setToken={setToken} setUser={setUser} />}
          </Route>

          <Route path="/books/:bookId">
            <BookDetail token={token} />
          </Route>

          <Route path="/profile">
            {user ? <Profile user={user} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
