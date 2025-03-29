import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white py-4 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} EmployWise. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;