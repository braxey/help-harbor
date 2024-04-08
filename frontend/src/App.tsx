import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserRegistration from './components/users/UserRegistration';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<UserRegistration />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
