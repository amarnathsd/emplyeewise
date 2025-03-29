import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title = '', 
  className = '' 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`
          bg-white rounded-xl shadow-2xl 
          w-full max-w-md 
          p-6 
          relative 
          ${className}
        `}
      >
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        )}
        
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 
            text-gray-500 hover:text-gray-700 
            focus:outline-none
          "
        >
          ✕
        </button>
        
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;