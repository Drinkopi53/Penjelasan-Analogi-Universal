// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ConceptInput from './components/ConceptInput';
import ActionButton from './components/ActionButton';
import ResultDisplay from './components/ResultDisplay';

const randomExamples = [
  { a: 'Otak', b: 'Komputer' },
  { a: 'Waktu', b: 'Sungai' },
  { a: 'Cinta', b: 'Perang' },
  { a: 'Belajar', b: 'Membangun Rumah' },
  { a: 'Ekonomi', b: 'Ekosistem Alam' },
  { a: 'Musik', b: 'Matematika' },
  { a: 'Harapan', b: 'Mercusuar' },
];

function App() {
  const [conceptA, setConceptA] = useState('');
  const [conceptB, setConceptB] = useState('');
  const [analogyResult, setAnalogyResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAnalogy = async (cptA = conceptA, cptB = conceptB) => { // Terima konsep sebagai argumen opsional
    if (!cptA.trim() || !cptB.trim()) {
      setError("Harap masukkan kedua konsep.");
      setAnalogyResult('');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalogyResult('');

    // Set state input jika konsep datang dari tombol acak
    // Ini akan memastikan input fields terupdate jika contoh acak dipilih
    if (cptA !== conceptA) setConceptA(cptA);
    if (cptB !== conceptB) setConceptB(cptB);

    try {
      const response = await fetch('http://localhost:5000/api/generate-analogy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conceptA: cptA, conceptB: cptB }), // Gunakan argumen fungsi
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Terjadi kesalahan: ${response.statusText} (Status: ${response.status})`);
      }

      setAnalogyResult(data.analogy);

    } catch (err) {
      console.error("Error saat fetch analogi:", err);
      setError(err.message || "Tidak dapat terhubung ke server atau terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * randomExamples.length);
    const example = randomExamples[randomIndex];
    // Langsung panggil handleGenerateAnalogy dengan konsep baru
    handleGenerateAnalogy(example.a, example.b);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-6 sm:py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-2xl">
        <Header />
        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <ConceptInput
              value={conceptA}
              onChange={(e) => setConceptA(e.target.value)}
              placeholder="Konsep A (mis: Kehidupan)"
            />
            <ConceptInput
              value={conceptB}
              onChange={(e) => setConceptB(e.target.value)}
              placeholder="Konsep B (mis: Roda)"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <ActionButton
              onClick={() => handleGenerateAnalogy()} // Pastikan memanggil tanpa argumen agar menggunakan state saat ini
              label="BUAT KONEKSI"
              isLoading={isLoading && (conceptA.trim() !== '' || conceptB.trim() !== '')} // Hanya loading jika dari tombol utama
            />
            <button
              onClick={handleRandomExample}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75
                        text-white font-bold py-3 px-4 rounded-lg w-full
                        disabled:opacity-60 disabled:cursor-not-allowed
                        transition-all duration-150 ease-in-out transform active:scale-95 shadow-md hover:shadow-lg"
            >
              {isLoading && (conceptA.trim() === '' && conceptB.trim() === '') ? 'Memproses...' : 'Coba Contoh Acak'}
            </button>
          </div>
          <ResultDisplay
            analogy={analogyResult}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
      <footer className="text-center mt-8 mb-4 text-gray-600 text-sm">
        Dibuat dengan React, Vite, dan Tailwind CSS. Backend oleh Node.js & Gemini.
      </footer>
    </div>
  );
}

export default App;
