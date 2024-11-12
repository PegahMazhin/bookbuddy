import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { getBooks } from './services/api';

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null); 
  useEffect(() => {
    async function fetchBooks() {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    }
    fetchBooks();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/books/:bookId" element={<BookDetails user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
