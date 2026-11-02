/**
 * ====================================================================
 * ROMANTIC CONFESSION & INVITATION TEMPLATE - CONFIGURATION
 * ====================================================================
 * Edit file ini untuk menyesuaikan nama, isi surat, tema, musik,
 * dan nomor WhatsApp sesuai keinginanmu!
 * 
 * Tips: Kamu juga bisa menggunakan tombol ⚙️ di pojok kanan bawah
 * pada website untuk mengedit secara langsung dengan live preview!
 */

window.CONFIG = {
  // === 1. INFORMASI UTAMA ===
  recipientName: "Amelisiya",            // Nama pasangan / pujaan hati
  senderName: "Kakajar",                 // Nama kamu (pengirim)
  nickname: "Amel",                     // Panggilan akrab (opsional)

  // === 2. TEMA & TAMPILAN ===
  // Pilihan tema:
  // - 'rose'     : Pink manis & romantis klasik (default)
  // - 'sunset'   : Peach & coral hangat
  // - 'lavender' : Ungu lilac estetik & anggun
  // - 'midnight' : Dark mode malam berbintang
  // - 'mint'     : Hijau pastel & toska segar
  // - 'ocean'    : Cyan & biru laut (fully blue ocean & blue emojis)
  theme: "ocean",

  // Tampilkan tombol gear ⚙️ untuk edit template langsung di browser?
  showSettingsButton: true,

  // Efek partikel melayang di background (hati, kelopak bunga, sparkle)
  enableParticles: true,
  
  // Efek kilau / sparkle mengikuti kursor atau sentuhan jari
  enableCursorTrail: true,

  // === 3. AUDIO & MUSIK ===
  music: {
    enabled: true,                     // Aktifkan audio
    autoplayOnFirstClick: true,        // Musik otomatis mulai saat layar pertama kali disentuh
    useCustomAudio: false,             // Set true jika ingin menggunakan file MP3 sendiri
    customAudioUrl: "",                // Contoh: "assets/audio/my-song.mp3" atau URL online
    volume: 0.65                       // Volume musik (0.0 sampai 1.0)
  },

  // === 4. RESPON WHATSAPP SETELAH DITERIMA ===
  whatsapp: {
    enabled: true,
    // Masukkan nomor WA dengan format internasional tanpa tanda '+' (Contoh: 6281234567890)
    phoneNumber: "6281234567890",
    // Pesan otomatis yang akan terisi di WhatsApp saat dia klik tombol chat
    message: "Hai Kakajar! 🥺💖 Aku udah buka websitemu... dan jawabannya: IYA, aku mau jadi pacar kamu! 🥰"
  },

  // === 5. KONTEN TIAP SCREEN ===
  screens: {
    // ----------------------------------------------------
    // SCREEN 1: INTRO (Tanya Waktu / Icebreaker)
    // ----------------------------------------------------
    intro: {
      image: "assets/images/intro.jpg",
      eyebrow: "Untuk Amelisiya ✨",
      title: "Boleh nggak aku curi satu menit waktu kamu?",
      subtitle: "Ada sesuatu yang udah lama ingin kusampaikan...",
      buttonText: "Boleh bangett 🥰"
    },

    // ----------------------------------------------------
    // SCREEN 2: PRELUDE (Jembatan Cerita)
    // ----------------------------------------------------
    prelude: {
      image: "assets/images/prelude.jpg",
      title: "Sebenarnya, udah dari kemarin aku kepikiran ini...",
      subtitle: "Tiap hari rasanya ada yang kurang kalau belum ngobrol sama kamu.",
      buttonText: "Mau bilang apa sih? 🤔"
    },

    // ----------------------------------------------------
    // SCREEN 3: CONFESSION (Surat & Tombol Nembak)
    // ----------------------------------------------------
    confess: {
      image: "assets/images/confess.jpg",
      salutation: "Dear Amelisiya,",
      letter: [
        "Sebenernya dari beberapa hari lalu aku tuh udah ngerasain suatu perasaan yang gabisa aku tolak, berawal dari cuma tatap-tatapan di server terror forsaken, terus saling maki-maki jerry, terus nonton drakor.",
        "Semua itu bikin perasaan aku nyaman, makanya aku tadi siang ngomong kalo akhir-akhir ini perasaan aku lebih lega. Aku juga sebenernya ngungkapin ini karena yakin banget kalo kamu punya perasaan yang sama, makanya aku mantapin diri aku hari ini.",
        "Tadi siang pas kamu bilang bisa bahasa jerman disitu aku shock berat karena aku kira kamu gak akan paham, soalnya semua status aku itu ngungkapin semua perasaan aku ke kamuu.",
        "Aku juga sempet beberapa kali overthinking tentang nopal yang nembak kamu, terus juga tentang status dan bio discord kamu, tapi aku coba buat positif thinking dan juga bertanya ke kamu, tapi aku ini bukan tipe orang yang maksa nyari tahu sesuatu dari seseorang karena takut orangnya gak nyaman.",
        "Oiya maaf ya kalo aku kepedean ngira kamu juga ada perasaan sama aku, karenakan aku sendiri gabisa tebak isi hati kamu kayak gimana gituu yaaa.",
        "Tapi hari ini aku bener-bener mantapin diri, perasaan aku bener-bener tulus banget ke kamuu.",
        "Will you be my girlfriend? 🥺💍"
      ],
      signature: "* made with all my love by Kakajar",
      scrollHint: "↓ geser pelan-pelan ke bawah ya ↓",
      yesButtonText: "Iya, aku mau 🥺💖",
      noButtonText: "Nggak dulu deh 😜",
      // Kalimat lucu saat tombol "Nggak" kabur / dihindari
      noDodgeTexts: [
        "Nggak dulu deh 😜",
        "Eits, ga kena! 😝",
        "Yakin ga mau? 🥺",
        "Tombol ini rusak lho 😂",
        "Pencet yang pink aja ya 💕",
        "Gabisa nolak pokoknya! 😋",
        "Harus pilih 'Iya' dong 💖"
      ],
      dodgeHint: "psst, tombol kanan agak nakal dan susah dipencet lho 😉"
    },

    // ----------------------------------------------------
    // SCREEN 4: CELEBRATION (Saat Dia Menjawab 'Iya')
    // ----------------------------------------------------
    result: {
      image: "assets/images/result.jpg",
      badge: "🎉 OFFICIAL RELATIONSHIP UNLOCKED 🎉",
      title: "WHATTT??? BENERAN?! 🥹❤️",
      message: "Jadi kita beneran officially jadi couple sekarang nih?!",
      submessage: "BURUAN CHAT AKU DAN BILANG KALAU KAMU NERIMA PLSS! 💖",
      whatsappBtnText: "Kirim Jawaban ke WhatsApp Kakajar 💬",
      copyBtnText: "Salin Pesan Balasan 📋",
      anniversaryNote: "Tersimpan di memori hati sejak hari ini 🔒✨"
    }
  }
};
