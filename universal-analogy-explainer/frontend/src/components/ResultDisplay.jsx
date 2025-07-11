// src/components/ResultDisplay.jsx
import React, { useState } from 'react'; // Tambahkan useState

const ResultDisplay = ({ analogy, isLoading, error }) => {
  const [copyNotification, setCopyNotification] = useState(''); // State untuk notifikasi

  const handleShare = () => {
    if (analogy && navigator.clipboard) {
      navigator.clipboard.writeText(analogy)
        .then(() => {
          setCopyNotification('Teks analogi disalin!');
          setTimeout(() => setCopyNotification(''), 2000); // Hilangkan notifikasi setelah 2 detik
        })
        .catch(err => {
          console.error('Gagal menyalin teks: ', err);
          setCopyNotification('Gagal menyalin.');
          setTimeout(() => setCopyNotification(''), 2000);
        });
    } else if (!navigator.clipboard) {
        setCopyNotification('Fitur salin tidak didukung browser ini.');
        setTimeout(() => setCopyNotification(''), 2000);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center mt-6 text-gray-600">Memuat analogi...</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-600 mt-6 bg-red-50 border border-red-200 rounded-md">Error: {error}</div>;
  }
  if (analogy) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg mt-6 bg-slate-50 shadow relative transition-all duration-300 ease-in-out transform opacity-0 animate-fadeIn">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Hasil Analogi:</h2>
          <button
            onClick={handleShare}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-1.5 px-4 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="Salin ke Clipboard"
          >
            Bagikan
          </button>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{analogy}</p>
        {copyNotification && (
          <div className="absolute top-0 right-0 mt-2 mr-2 bg-gray-700 text-white text-xs py-1 px-3 rounded-full shadow-lg transition-opacity duration-300 ease-in-out">
            {copyNotification}
          </div>
        )}
      </div>
    );
  }
  // Pesan default jika tidak ada analogi, error, atau loading
  return <div className="p-4 text-center mt-6 text-gray-500">Masukkan dua konsep di atas dan klik "Buat Koneksi" untuk melihat hasilnya di sini.</div>;
};

export default ResultDisplay;
