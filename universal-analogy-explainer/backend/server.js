const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let genAI;
try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in .env file");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (e) {
    console.error("Failed to initialize GoogleGenerativeAI:", e.message);
    process.exit(1);
}

app.post('/api/generate-analogy', async (req, res) => {
    try {
        const { conceptA, conceptB } = req.body;

        if (!conceptA || !conceptB) {
            return res.status(400).json({ error: 'Kedua konsep (conceptA dan conceptB) harus diisi.' });
        }

        // Mengubah model ke gemini-1.5-flash-latest
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = `Jelaskan analogi antara "${conceptA}" dan "${conceptB}". Berikan penjelasan yang kreatif dan mudah dipahami.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ analogy: text });

    } catch (error) {
        console.error('Error generating analogy:', error);
        const errorMessage = error.message || 'Terjadi kesalahan saat menghubungi Gemini API.';
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
             return res.status(500).json({ error: `Gemini API Error: ${error.response.data.error.message}` });
        } else if (error.status && error.statusText) {
             return res.status(error.status).json({ error: `Gemini API Fetch Error: ${error.statusText}. Pastikan API Key valid dan memiliki izin yang benar. Model yang digunakan mungkin tidak sesuai.`});
        }
        return res.status(500).json({ error: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server backend berjalan di http://localhost:${port}`);
});
