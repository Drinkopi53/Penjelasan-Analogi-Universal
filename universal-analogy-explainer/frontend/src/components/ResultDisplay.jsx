// src/components/ResultDisplay.jsx
import React from 'react';

const ResultDisplay = ({ analogy, isLoading, error }) => {
  if (isLoading) {
    return <div className="p-4 text-center mt-4">Memuat analogi...</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-500 mt-4">Error: {error}</div>;
  }
  if (analogy) {
    return (
      <div className="p-4 border rounded mt-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Hasil Analogi:</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{analogy}</p>
      </div>
    );
  }
  return <div className="p-4 text-center mt-4 text-gray-500">Masukkan dua konsep dan klik "Buat Koneksi".</div>;
};

export default ResultDisplay;
