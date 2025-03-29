import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="h-full md:w-[20rem]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.4 
        }}
        className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl"
        whileHover={{ 
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Card Header with gradient */}
        <div className="h-12 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="p-6 flex-grow">
          <div className="flex flex-col items-center">
            {/* Avatar with animation */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative -mt-12 mb-4"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-sm opacity-70 -m-1"></div>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white relative z-10 shadow-md"
              />
            </motion.div>
            
            {/* User details */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                {user.email}
              </p>
            </motion.div>
          </div>
          
          {/* Additional user info - could be extended */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 text-center text-sm my-4"
          >
            <div className="p-2 bg-indigo-50 rounded-lg">
              <p className="text-gray-500">ID</p>
              <p className="font-medium text-indigo-700">#{user.id}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-purple-700">User</p>
            </div>
          </motion.div>
        </div>
        
        {/* Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 border-t border-gray-100"
        >
          <div className="flex justify-between space-x-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={onEdit}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">Edit</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={onDelete}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">Delete</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserCard;