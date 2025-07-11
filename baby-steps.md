# **Rencana Aksi AI: Proyek "Penjelas Analogi Universal"**

Dokumen ini berisi instruksi langkah-demi-langkah (baby steps) yang harus diikuti oleh AI untuk mengembangkan proyek "Penjelas Analogi Universal" dari awal hingga fungsional penuh di lingkungan lokal. Setiap fase harus diselesaikan secara berurutan.

### **FASE 0: PERSIAPAN LINGKUNGAN**

**Tujuan:** Menyiapkan semua alat dan kredensial yang diperlukan.

* **Langkah 0.1:** Pastikan Anda memiliki akses ke API Key untuk Google Gemini. Simpan di tempat yang aman.  
* **Langkah 0.2:** Buat sebuah folder proyek utama dengan nama universal-analogy-explainer.  
* **Langkah 0.3:** Di dalam folder tersebut, buat dua sub-folder: frontend dan backend.

### **FASE 1: PENGEMBANGAN BACKEND (SISI SERVER)**

**Tujuan:** Membangun server yang dapat menerima dua konsep dan berkomunikasi dengan Gemini API.

* **Langkah 1.1:** Masuk ke direktori backend.  
* **Langkah 1.2:** Inisialisasi proyek Node.js dengan menjalankan perintah npm init \-y.  
* **Langkah 1.3:** Instal *dependencies* yang dibutuhkan: npm install express @google/generative-ai dotenv cors.  
* **Langkah 1.4:** Buat file bernama .env dan tambahkan API key Anda: GEMINI\_API\_KEY="MASUKKAN\_API\_KEY\_ANDA\_DI\_SINI".  
* **Langkah 1.5:** Buat file utama server bernama server.js.  
* **Langkah 1.6 (Kode Backend):** Tulis kode untuk server.js. Kode ini harus melakukan hal berikut:  
  * Meng-impor express, @google/generative-ai, dotenv, dan cors.  
  * Menginisialisasi Express app dan mengaktifkan cors() serta express.json().  
  * Membuat satu endpoint POST dengan rute /api/generate-analogy.  
  * Di dalam endpoint tersebut:  
    * Ambil conceptA dan conceptB dari *body request*.  
    * Lakukan validasi: pastikan kedua konsep tidak kosong.  
    * Gunakan *prompt template* yang ada di proposal (Bab 3.3) untuk menyusun *prompt* akhir.  
    * Kirim *prompt* tersebut ke Gemini API.  
    * Tangani respons dari API: jika berhasil, kirim kembali teks analogi ke klien. Jika gagal, kirim pesan error.  
  * Jalankan server pada port yang ditentukan (misal: 5000).  
* **Langkah 1.7 (Testing Backend):** Uji endpoint /api/generate-analogy menggunakan alat seperti Postman atau cURL untuk memastikan server dapat menghasilkan analogi dengan benar sebelum melanjutkan ke frontend.

### **FASE 2: PENGEMBANGAN FRONTEND (SISI KLIEN)**

**Tujuan:** Membangun antarmuka pengguna yang minimalis dan fungsional sesuai desain di proposal.

* **Langkah 2.1:** Masuk ke direktori frontend.  
* **Langkah 2.2:** Buat proyek React baru menggunakan Vite (lebih cepat): npm create vite@latest . \-- \--template react.  
* **Langkah 2.3:** Instal *dependencies* yang dibutuhkan: npm install dan npm install tailwindcss postcss autoprefixer && npx tailwindcss init \-p.  
* **Langkah 2.4:** Konfigurasikan Tailwind CSS dengan mengikuti dokumentasi resminya untuk Vite.  
* **Langkah 2.5 (Struktur Komponen):** Buat komponen-komponen berikut di dalam folder src/components:  
  * ConceptInput.jsx: Komponen untuk kotak input teks.  
  * ActionButton.jsx: Komponen untuk tombol utama "BUAT KONEKSI".  
  * ResultDisplay.jsx: Komponen untuk menampilkan hasil analogi dengan efek ketik.  
  * Header.jsx: Komponen untuk judul website.  
* **Langkah 2.6 (Desain Halaman Utama):** Di dalam App.jsx, susun tata letak halaman:  
  * Gunakan Flexbox atau Grid dari Tailwind CSS untuk memusatkan konten di tengah layar.  
  * Tampilkan komponen Header.  
  * Tampilkan dua komponen ConceptInput secara berdampingan atau atas-bawah.  
  * Tampilkan satu komponen ActionButton di bawah input.  
  * Tampilkan komponen ResultDisplay di bagian bawah.  
* **Langkah 2.7 (Manajemen State):** Di App.jsx, gunakan useState untuk mengelola:  
  * conceptA (string)  
  * conceptB (string)  
  * analogyResult (string)  
  * isLoading (boolean, untuk menampilkan indikator loading)  
  * error (string, untuk menampilkan pesan error)

### **FASE 3: INTEGRASI FRONTEND & BACKEND**

**Tujuan:** Menghubungkan antarmuka pengguna dengan server agar aplikasi berfungsi secara penuh.

* **Langkah 3.1:** Di App.jsx, buat sebuah fungsi *asynchronous* bernama handleGenerateAnalogy.  
* **Langkah 3.2:** Fungsi ini akan dipicu ketika ActionButton di-klik.  
* **Langkah 3.3 (Logika Fetch):** Di dalam handleGenerateAnalogy:  
  * Set isLoading menjadi true dan error menjadi kosong.  
  * Gunakan fetch API untuk mengirim POST request ke http://localhost:5000/api/generate-analogy.  
  * Sertakan conceptA dan conceptB dari *state* di dalam *body request* dalam format JSON.  
  * Tunggu respons dari backend.  
  * Jika respons berhasil (status 200), perbarui *state* analogyResult dengan data yang diterima.  
  * Jika gagal, perbarui *state* error dengan pesan error dari backend.  
  * Apapun hasilnya, set isLoading kembali menjadi false.  
* **Langkah 3.4 (Menampilkan Hasil):**  
  * Kirim analogyResult, isLoading, dan error sebagai *props* ke komponen ResultDisplay.  
  * Di dalam ResultDisplay, tampilkan indikator loading jika isLoading adalah true.  
  * Tampilkan pesan error jika error ada isinya.  
  * Jika analogyResult ada isinya, tampilkan teks tersebut. **Bonus:** Implementasikan efek ketik (typing effect) menggunakan useEffect dan setTimeout.

### **FASE 4: FITUR TAMBAHAN & PENYEMPURNAAN**

**Tujuan:** Menambahkan fitur-fitur pelengkap sesuai proposal untuk meningkatkan pengalaman pengguna.

* **Langkah 4.1 (Tombol Contoh Acak):**  
  * Buat sebuah tombol baru "Coba Contoh Acak".  
  * Buat sebuah array di App.jsx yang berisi beberapa pasang konsep menarik (misal: \[{a: 'Gravitasi', b: 'Cinta'}, {a: 'Siklus Air', b: 'Manajemen Proyek'}\]).  
  * Ketika tombol ini diklik, pilih satu pasang konsep secara acak dari array dan set conceptA dan conceptB di *state*, lalu panggil handleGenerateAnalogy.  
* **Langkah 4.2 (Tombol Bagikan):**  
  * Buat sebuah tombol "Bagikan" yang muncul di samping hasil analogi.  
  * Ketika diklik, gunakan navigator.clipboard.writeText() untuk menyalin teks dari analogyResult ke clipboard pengguna. Tampilkan notifikasi singkat seperti "Teks disalin\!".  
* **Langkah 4.3 (Styling & Animasi):**  
  * Perhalus tampilan menggunakan transisi dan animasi halus dari Tailwind CSS.  
  * Pastikan desain sepenuhnya responsif untuk perangkat mobile dan desktop.

### **FASE 5: PENGUJIAN AKHIR & FINALISASI**

**Tujuan:** Memastikan aplikasi bebas dari bug dan siap untuk tahap selanjutnya.

* **Langkah 5.1 (Pengujian End-to-End):**  
  * Uji semua fungsionalitas: input kosong, input normal, tombol acak, tombol bagikan.  
  * Uji di berbagai browser (Chrome, Firefox, Safari).  
  * Uji di berbagai ukuran layar (desktop, tablet, mobile).  
* **Langkah 5.2 (Pembersihan Kode):**  
  * Pastikan semua kode sudah rapi, diberi komentar, dan tidak ada console.log yang tidak perlu.  
* **Langkah 5.3 (Finalisasi Lokal):** Proyek selesai 100% secara fungsional di lingkungan lokal.