# 💌 Romantic Confession Website & Interactive Love Letter Template

Website interaktif romantis untuk menyatakan perasaan (*love confession*) atau merayakan hari jadian (*anniversary*) dengan tampilan modern, estetik, dan interaktif. Dibuat dengan arsitektur modular yang sangat mudah diubah namanya, kata-katanya, tema warnanya, maupun fotonya tanpa perlu kemampuan pemrograman rumit!

---

## ✨ Fitur Unggulan & Pembaruan

1. **🎨 Tampilan Visual Modern (Glassmorphism & Micro-Interactions)**
   - Desain frosted glass modern yang lembut dan nyaman di mata (*clean aesthetic*).
   - Tipografi manis kombinasi **Baloo 2** (ramah & *playful*) dan **Plus Jakarta Sans** (bersih & modern).
   - Dukungan penuh layar *smartphone* modern (`100dvh` agar tidak tertutup *address bar* peramban seluler).

2. **🎶 Ambient Audio Synth & SFX Otomatis**
   - Menggunakan **Web Audio API** untuk menghasilkan lantunan melodi akord lo-fi romantis yang lembut dan tidak bising.
   - Dilengkapi *Music Widget Pill* di pojok layar dengan animasi equalizer interaktif (bisa di-*play* / *pause* kapan saja).
   - Efek suara klik (*chime* kristal) dan efek suara sorakan gembira (*yay SFX*) saat pengakuan diterima.

3. **✨ Partikel & Stardust Canvas Interaktif**
   - Latar belakang dinamis dengan partikel bintang, kilauan (*sparkles*), dan gelembung hati yang mengapung lembut.
   - Merespons sentuhan jari di layar sentuh ponsel atau gerakan kursor di laptop.

4. **🏃‍♂️ Smart Runaway "No" Button (Tombol Tolak Anti-Kena)**
   - Tombol *"Nggak dulu deh"* akan kabur secara cerdas setiap kali kursor atau jari mendekatinya.
   - Dilengkapi kata-kata lelucon acak yang berganti tiap kali dihindari (*"Eits ga kena!", "Tombol ini rusak lho!", "Gabisa nolak pokoknya!"*).
   - Setiap kali tombol kabur, tombol **"Iya, aku mau"** akan membesar secara perlahan agar semakin mudah dipilih.

5. **🎉 Selebrasi Meriah & Tanggal Jadian Otomatis**
   - Saat tombol "Iya" ditekan, badai konfeti warna-warni dan balon hati berterbangan melintasi layar.
   - Mendeteksi dan mencatat tanggal resmi jadian secara otomatis sesuai hari saat ia menekan tombol.

6. **💬 Tombol Respons Langsung ke WhatsApp**
   - Dilengkapi tombol konfirmasi yang langsung membuka aplikasi WhatsApp dan mengetikkan pesan jawaban romantis ke nomor ponselmu.

7. **⚙️ In-Browser Live Customizer (Modal Pengaturan)**
   - Tersedia tombol **"⚙️ Ubah Teks & Desain"** di pojok kiri atas layar.
   - Kamu bisa mengganti nama pasangan, nama pengirim, tema warna, nomor WhatsApp, dan isi surat langsung di browser!
   - Hasil kustomisasi bisa langsung di-*preview* seketika atau diunduh sebagai file `.html` baru sekali klik.

---

## 📁 Struktur Berkas

```
romantic-confession-template/
├── index.html            # Berkas HTML utama (versi modular)
├── standalone.html       # Berkas HTML mandiri (semua gambar, audio, CSS & JS tertanam 100%)
├── config.js             # Pusat konfigurasi teks, nama, tema warna, & nomor WhatsApp
├── style.css             # Lembar gaya (CSS Variables, Glassmorphism, Responsive)
├── script.js             # Mesin logika interaktif, Web Audio synth, partikel, & konfeti
├── build_standalone.js   # Skrip bundler untuk mengkompilasi standalone.html
├── assets/
│   ├── images/           # Foto & stiker ilustrasi ekspresif
│   │   ├── intro.jpg     # Stiker halaman 1 (menyapa)
│   │   ├── prelude.jpg   # Stiker halaman 2 (pengantar malu-malu)
│   │   ├── confess.jpg   # Stiker halaman 3 (membawa surat cinta)
│   │   └── result.jpg    # Stiker halaman 4 (perayaan diterima)
│   └── audio/
│       └── yay.mp3       # Efek suara perayaan kemenangan
└── README.md             # Petunjuk pemakaian lengkap
```

---

## 🚀 2 Cara Mengubah / Menjadikan Template

Kamu memiliki dua cara yang sangat mudah untuk mempersonalisasi website ini:

### Cara 1: Menggunakan Live Customizer di Browser (Tanpa Buka Kode!)
1. Buka berkas `index.html` atau `standalone.html` di browser pilihanmu (Google Chrome, Microsoft Edge, Safari, Firefox).
2. Klik tombol **"⚙️ Ubah Teks & Desain"** di pojok kiri atas.
3. Ubah kolom yang tersedia:
   - **Nama Gebetan / Pasangan** (misal: *Calvina*)
   - **Nama Kamu** (misal: *Alpin*)
   - **Pilihan Tema Warna**: Cukup klik salah satu warna yang kamu sukai.
   - **Nomor WhatsApp**: Masukkan dengan format internasional, contoh: `6281234567890`.
   - **Isi Surat**: Tuliskan isi hatimu dengan memisahkan tiap paragraf menggunakan enter dua kali.
4. Klik **"Terapkan Langsung ✨"** untuk melihat hasilnya secara *real-time*.
5. Jika sudah puas, klik tombol **"💾 Unduh HTML"** untuk mengunduh satu file `.html` siap kirim yang telah menyimpan seluruh perubahanmu.

### Cara 2: Mengubah Berkas `config.js`
Buka berkas `config.js` menggunakan teks editor (VS Code, Notepad, Sublime, dsb). Semua variabel telah diberi anotasi bahasa Indonesia:

```javascript
window.CONFIG = {
  recipientName: "Calvina",    // Nama orang yang kamu tuju
  senderName: "Alpin",         // Nama panggilanmu
  theme: "rose",               // Pilihan: "rose" | "sunset" | "lavender" | "midnight" | "mint"

  whatsapp: {
    phoneNumber: "628xxxxxxxxxx", // Format: 628... (tanpa tanda + atau spasi)
    message: "Hai Alpin! Aku udah buka websitemu dan IYA aku mau jadi pacar kamu! 💖"
  },

  screens: {
    intro: {
      title: "Boleh nggak aku curi satu menit waktu kamu?",
      buttonText: "Boleh bangett 🥰"
    },
    // ... konfigurasi halaman lainnya
  }
};
```

---

## 🎨 6 Pilihan Tema Warna Bawaan

| Nama Tema | Nuansa | Cocok Untuk |
| :--- | :--- | :--- |
| **`rose`** (Default) | Pink blush, soft pastel, & mawar merah | Nuansa manis, romantis klasik, & feminin |
| **`sunset`** | Oranye hangat, peach, & coral lembut | Suasana hangat, ceria, & penuh kehangatan senja |
| **`lavender`** | Ungu pastel, lilac, & orchid | Kesan anggun, misterius, tenang, & estetik |
| **`midnight`** | Biru malam, deep indigo, & ungu bintang | Nuansa langit malam penuh bintang yang intim |
| **`mint`** | Hijau pastel lembut, teal, & toska segar | Kesan sejuk, santai, menenangkan, & alami |
| **`ocean`** (Baru!) | **Cyan luminous & biru samudra (Fully Blue Ocean)** | **Serba biru estetik: gradasi cyan, orbe biru, gelembung air *real-time*, konfeti biru, serta seluruh emoji otomatis berganti menjadi emoji biru samudra (💙, 🩵, 🫧, 🌊, 💎, 🐬, 🐳)** |

---

## 🌐 Cara Mempublikasikan Secara Online (Gratis)

Jika ingin membagikan link website ini ke WhatsApp atau Instagram si dia, kamu bisa memilih salah satu metode gratis berikut:

### Opsi A: Netlify Drop (Paling Mudah — 30 Detik)
1. Buka peramban dan kunjungi [app.netlify.com/drop](https://app.netlify.com/drop).
2. Tarik (*drag and drop*) seluruh folder `romantic-confession-template` ke kotak yang tersedia.
3. Dalam beberapa detik, Netlify akan memberimu link publik (misal: `https://sweet-confession.netlify.app`).

### Opsi B: Vercel
1. Unduh atau instal aplikasi CLI Vercel / buka [vercel.com](https://vercel.com).
2. Masukkan repositori atau unggah folder ini ke dasbor Vercel.
3. Klik **Deploy** dan website langsung aktif di domain `.vercel.app`.

### Opsi C: GitHub Pages
1. Buat repositori baru di GitHub dengan nama bebas (misal: `surat-cinta`).
2. Unggah semua berkas dalam repositori tersebut.
3. Buka menu **Settings** > **Pages** > Pada bagian *Branch*, pilih `main` dan klik **Save**.
4. Website akan tayang di `https://username.github.io/surat-cinta/`.

### Opsi D: Kirim Langsung `standalone.html` (Tanpa Hosting)
Kamu cukup mengirimkan berkas `standalone.html` secara langsung lewat pesan dokumen WhatsApp, Telegram, atau email. Pasanganmu tinggal mengklik file tersebut dan langsung terbuka di browser ponselnya secara instan tanpa perlu koneksi server khusus!

---

## 💡 Tips & Personalisasi Lanjutan
- **Menyembunyikan Tombol Pengaturan:** Saat kamu ingin mengirimkan website ini ke pasangan dan tidak ingin tombol *"Ubah Teks & Desain"* terlihat olehnya, buka `config.js` lalu ubah `showSettingsButton: true` menjadi `showSettingsButton: false`.
- **Ganti Foto Sendiri:** Cukup letakkan foto pasangan atau foto kebersamaan kalian di folder `assets/images/` dengan format `.jpg` atau `.png`, lalu sesuaikan jalurnya di `config.js`.

---
*Dibuat dengan cinta untuk membantu momen spesialmu menjadi tak terlupakan!* 💌✨
