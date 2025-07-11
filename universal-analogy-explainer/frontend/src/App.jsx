// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ConceptInput from './components/ConceptInput';
import ActionButton from './components/ActionButton';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [conceptA, setConceptA] = useState('');
  const [conceptB, setConceptB] = useState('');
  const [analogyResult, setAnalogyResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAnalogy = () => {
    // Logika fetch akan ditambahkan di Fase 3
    // Ini adalah placeholder untuk simulasi
    if (!conceptA.trim() || !conceptB.trim()) {
      setError("Harap masukkan kedua konsep.");
      setAnalogyResult('');
      return;
    }

    console.log("Mencoba menghasilkan analogi untuk:", conceptA, "dan", conceptB);
    setIsLoading(true);
    setError('');
    setAnalogyResult('');

    setTimeout(() => {
      // Simulasi respons dari backend
      setAnalogyResult(`Ini adalah analogi placeholder yang dihasilkan secara lokal antara "${conceptA}" dan "${conceptB}". Implementasi nyata akan memanggil backend.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-2xl">
        <Header />
        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          <ActionButton
            onClick={handleGenerateAnalogy}
            label="BUAT KONEKSI"
            isLoading={isLoading}
          />
          <ResultDisplay
            analogy={analogyResult}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
      <footer className="text-center mt-8 text-gray-600 text-sm">
        Dibuat dengan React, Vite, dan Tailwind CSS. Backend oleh Node.js & Gemini.
      </footer>
    </div>
  );
}

export default App;
