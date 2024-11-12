const API_BASE_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';

export const registerUser = async (firstname, lastname, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/books`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getBookById = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateBookAvailability = async (bookId, available, token) => {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ available }),
  });
  return response.json();
};

export const getUserReservations = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/reservations`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const deleteReservation = async (reservationId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
