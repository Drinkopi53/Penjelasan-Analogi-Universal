// src/components/ConceptInput.jsx
import React from 'react';

const ConceptInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full mb-2 md:mb-0 md:mr-2" // Disesuaikan untuk layout
    />
  );
};

export default ConceptInput;
