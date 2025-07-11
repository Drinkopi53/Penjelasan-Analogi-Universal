// src/components/ActionButton.jsx
import React from 'react';

const ActionButton = ({ onClick, label, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
    >
      {isLoading ? 'Memproses...' : label}
    </button>
  );
};

export default ActionButton;
