import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div className="text-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-8xl"
      >
        😕
      </motion.div>

      <h1 className="text-9xl font-extrabold text-white drop-shadow-md">404</h1>
      <p className="text-2xl mt-4 text-white font-light">Oops! The page you’re looking for can’t be found.</p>
      <p className="text-white mt-2">But don’t worry, you can always head back home!</p>

      <Link to="/" className="mt-8 inline-block">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg transition duration-300"
        >
          Go Home
        </motion.button>
      </Link>
    </div>
  </div>
);
};

export default Error404
