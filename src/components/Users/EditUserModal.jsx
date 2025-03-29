import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '../../context/UserContext';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

const EditUserModal = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const { updateUser } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUser(user.id, { 
        first_name: firstName, 
        last_name: lastName, 
        email 
      });
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 600); // Small delay to show success animation
    } catch (error) {
      console.error('Update failed', error);
      setIsSaving(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 } 
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)" }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Edit User Profile</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white rounded-full p-1 hover:bg-white hover:bg-opacity-20"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* User Avatar Section */}
        <div className="flex justify-center -mt-6">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-sm opacity-70 -m-1"></div>
            <img 
              src={user.avatar} 
              alt={`${user.first_name} ${user.last_name}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md relative z-10"
            />
          </motion.div>
        </div>
        
        {/* Form Section */}
        <div className="p-6 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <motion.input
                whileFocus="focus"
                variants={inputVariants}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <motion.input
                whileFocus="focus"
                variants={inputVariants}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <motion.input
                whileFocus="focus"
                variants={inputVariants}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
              />
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              className="flex justify-between mt-8 pt-4 border-t border-gray-100"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors flex items-center"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={!isSaving ? { scale: 1.05 } : {}}
                whileTap={!isSaving ? { scale: 0.95 } : {}}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center ${
                  isSaving 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                {isSaving ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  'Save Changes'
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditUserModal;