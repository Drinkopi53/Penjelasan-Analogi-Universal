// src/components/ConceptInput.jsx
import React from 'react';

const ConceptInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-3 rounded-lg w-full shadow-sm
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 transition-all duration-150 ease-in-out text-gray-700
                 placeholder-gray-400" // Styling tambahan untuk placeholder
    />
  );
};

export default ConceptInput;
