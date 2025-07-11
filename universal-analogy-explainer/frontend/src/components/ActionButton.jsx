// src/components/ActionButton.jsx
import React from 'react';

const ActionButton = ({ onClick, label, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
                 text-white font-bold py-3 px-4 rounded-lg w-full
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-150 ease-in-out transform active:scale-95 shadow-md hover:shadow-lg"
    >
      {isLoading ? 'Memproses...' : label}
    </button>
  );
};

export default ActionButton;
