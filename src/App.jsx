import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import './index.css';


// Components
import LoginPage from './components/Auth/LoginPage';
import UserList from './components/Users/UserList';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;