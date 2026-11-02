/**
 * ====================================================================
 * ROMANTIC CONFESSION & TEMPLATE - CORE ENGINE (script.js)
 * Fully customizable, reactive, with multi-theme support including
 * the fully blue "Ocean" theme (all elements & emojis cyan/blue).
 * ====================================================================
 */

(function () {
  'use strict';

  // --- State Variables ---
  let currentScreen = 'introScreen';
  let dodgeCount = 0;
  let audioCtx = null;
  let musicGain = null;
  let musicOn = true;
  let musicStarted = false;
  let musicTimer = null;
  let activeChordOscs = [];
  let customAudioEl = null;

  // Cache DOM Elements
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const musicWidget = document.getElementById('musicWidget');
  const modalOverlay = document.getElementById('settingsModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const settingsToggleBtn = document.getElementById('settingsToggleBtn');
  const applySettingsBtn = document.getElementById('applySettingsBtn');
  const copyConfigBtn = document.getElementById('copyConfigBtn');
  const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
  const copyResponseBtn = document.getElementById('copyResponseBtn');
  const toastNotification = document.getElementById('toastNotification');

  // ==========================================
  // 1. THEME & EMOJI UTILITIES
  // ==========================================
  function isOceanTheme() {
    const cfg = window.CONFIG;
    return (cfg?.theme === 'ocean') || (document.documentElement.getAttribute('data-theme') === 'ocean');
  }

  /**
   * Transforms emojis and pink references into blue ocean counterparts
   * whenever the "ocean" theme is active.
   */
  function oceanizeEmoji(str) {
    if (!isOceanTheme() || typeof str !== 'string') return str;
    return str
      .replace(/🌸|🌺|🌷|🌹/g, '🌊')
      .replace(/💖|❤️|💕|💗|💓|💌/g, '💙')
      .replace(/🥰/g, '🥺💙')
      .replace(/💍/g, '💎')
      .replace(/🎉/g, '🌊')
      .replace(/✨/g, '🫧')
      .replace(/📅/g, '🗓️💙')
      .replace(/pink/gi, 'biru')
      .replace(/merah jambu/gi, 'biru ocean');
  }

  // ==========================================
  // 2. INITIALIZATION FROM CONFIG
  // ==========================================
  function initFromConfig() {
    const cfg = window.CONFIG;
    if (!cfg) return;

    // Apply Theme Attribute
    if (cfg.theme) {
      document.documentElement.setAttribute('data-theme', cfg.theme);
    }
    const isOcean = isOceanTheme();

    // Dynamic Favicon
    const faviconEl = document.querySelector("link[rel*='icon']");
    if (faviconEl) {
      faviconEl.href = isOcean
        ? "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💙</text></svg>"
        : "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>";
    }

    // Music Widget Icon
    const musicIconEl = document.querySelector('.music-icon');
    if (musicIconEl) {
      musicIconEl.textContent = isOcean ? '🌊' : '🎵';
    }

    // Document Title
    document.title = isOcean
      ? `Ada yang mau ${cfg.senderName || 'aku'} bilang ke ${cfg.recipientName || 'kamu'}... 💙🌊`
      : `Ada yang mau ${cfg.senderName || 'aku'} bilang ke ${cfg.recipientName || 'kamu'}... 💖`;

    // Screen 1: Intro
    const intro = cfg.screens?.intro || {};
    if (document.getElementById('introEyebrow')) {
      document.getElementById('introEyebrow').textContent = oceanizeEmoji(intro.eyebrow || `Untuk ${cfg.recipientName} 🌸`);
    }
    if (document.getElementById('introTitle')) {
      document.getElementById('introTitle').textContent = oceanizeEmoji(intro.title || 'Boleh nggak aku curi satu menit waktu kamu?');
    }
    if (document.getElementById('introSubtitle')) {
      document.getElementById('introSubtitle').textContent = oceanizeEmoji(intro.subtitle || 'Ada pesan kecil yang mau aku sampaikan dari hati yang paling dalam ✨');
    }
    if (document.getElementById('introBtn')) {
      document.getElementById('introBtn').textContent = oceanizeEmoji(intro.buttonText || 'Boleh bangett 🥰');
    }
    if (document.getElementById('introPhoto') && intro.image) {
      document.getElementById('introPhoto').src = intro.image;
    }

    // Screen 2: Prelude
    const prelude = cfg.screens?.prelude || {};
    if (document.getElementById('preludeTitle')) {
      document.getElementById('preludeTitle').textContent = oceanizeEmoji(prelude.title || 'Udah lama sebenarnya aku pengen bilang ini...');
    }
    if (document.getElementById('preludeSubtitle')) {
      document.getElementById('preludeSubtitle').textContent = oceanizeEmoji(prelude.subtitle || 'Tiap hari kepikiran terus, akhirnya hari ini beraniin diri buat ngetik ini semua 🫣');
    }
    if (document.getElementById('preludeBtn')) {
      document.getElementById('preludeBtn').textContent = oceanizeEmoji(prelude.buttonText || 'Mau bilang apa sih? 🥺');
    }
    if (document.getElementById('preludePhoto') && prelude.image) {
      document.getElementById('preludePhoto').src = prelude.image;
    }

    // Screen 3: Confess
    const confess = cfg.screens?.confess || {};
    if (document.getElementById('confessPhoto') && confess.image) {
      document.getElementById('confessPhoto').src = confess.image;
    }
    if (document.getElementById('letterSalutation')) {
      document.getElementById('letterSalutation').textContent = oceanizeEmoji(confess.salutation || `Dear ${cfg.recipientName},`);
    }
    if (document.getElementById('letterSignature')) {
      document.getElementById('letterSignature').textContent = oceanizeEmoji(confess.signature || `* made with all my love by ${cfg.senderName}`);
    }
    if (document.getElementById('scrollHint')) {
      document.getElementById('scrollHint').innerHTML = oceanizeEmoji(confess.scrollHint || '📜 geser buat baca semuanya 📜');
    }
    if (document.getElementById('dodgeHint')) {
      document.getElementById('dodgeHint').textContent = oceanizeEmoji(confess.dodgeHint || 'psst, tombol kanan agak susah dipencet lho 🤭');
    }
    if (yesBtn) {
      yesBtn.textContent = oceanizeEmoji(confess.yesButtonText || 'Iya, aku mau 🥰💍');
    }
    if (noBtn) {
      noBtn.textContent = oceanizeEmoji(confess.noButtonText || 'Nggak dulu deh 😜');
    }

    // Render Letter Paragraphs
    const letterContainer = document.getElementById('letterParagraphs');
    if (letterContainer && Array.isArray(confess.letter)) {
      letterContainer.innerHTML = '';
      confess.letter.forEach((para) => {
        // If it's the question paragraph, highlight it nicely!
        if (para.toLowerCase().includes('will you be my girlfriend') || para.toLowerCase().includes('mau jadi pacar')) {
          const highlightBox = document.createElement('div');
          highlightBox.className = 'question-highlight-box';
          const icon = isOcean ? '🌊💙' : '🌸';
          highlightBox.textContent = `${icon} ${oceanizeEmoji(para)} ${icon}`;
          letterContainer.appendChild(highlightBox);
        } else {
          const p = document.createElement('p');
          p.textContent = oceanizeEmoji(para);
          letterContainer.appendChild(p);
        }
      });
    }

    // Screen 4: Result / Celebration
    const result = cfg.screens?.result || {};
    if (document.getElementById('resultPhoto') && result.image) {
      document.getElementById('resultPhoto').src = result.image;
    }
    if (document.getElementById('resultBadge')) {
      document.getElementById('resultBadge').textContent = oceanizeEmoji(result.badge || '🎉 OFFICIAL RELATIONSHIP UNLOCKED 🎉');
    }
    if (document.getElementById('resultTitle')) {
      document.getElementById('resultTitle').textContent = oceanizeEmoji(result.title || 'WHATTT??? BENERAN?! 😭😭❤️');
    }
    if (document.getElementById('resultMessage')) {
      document.getElementById('resultMessage').textContent = oceanizeEmoji(result.message || 'Jadi kita beneran officially jadi couple sekarang nih?!');
    }
    if (document.getElementById('resultSubmessage')) {
      document.getElementById('resultSubmessage').textContent = oceanizeEmoji(result.submessage || 'BURUAN CHAT AKU DAN BILANG KALAU KAMU NERIMA SEKARANG JUGA! 💌');
    }

    // WhatsApp Action Button
    const waBtn = document.getElementById('whatsappBtn');
    if (waBtn && cfg.whatsapp) {
      const phone = cfg.whatsapp.phoneNumber ? cfg.whatsapp.phoneNumber.replace(/[^0-9]/g, '') : '';
      const rawMsg = cfg.whatsapp.message || `Hai ${cfg.senderName}! Aku udah buka websitemu dan IYA aku mau jadi pacar kamu! 💖`;
      const text = encodeURIComponent(oceanizeEmoji(rawMsg));
      waBtn.href = phone ? `https://wa.me/${phone}?text=${text}` : `https://api.whatsapp.com/send?text=${text}`;
      waBtn.textContent = oceanizeEmoji(result.whatsappBtnText || `Kirim Jawaban ke WhatsApp ${cfg.senderName} 💬`);
    }

    if (copyResponseBtn) {
      copyResponseBtn.textContent = oceanizeEmoji(result.copyBtnText || '📋 Salin Teks Jawaban Romantis');
    }

    const footerSig = document.getElementById('footerSignature');
    if (footerSig) {
      footerSig.textContent = oceanizeEmoji(`* made with all my love by ${cfg.senderName}`);
    }

    // Form inputs in customizer modal
    populateCustomizerForm();

    // Toggle settings button visibility
    if (settingsToggleBtn) {
      settingsToggleBtn.style.display = cfg.showSettingsButton !== false ? 'flex' : 'none';
    }
  }

  // ==========================================
  // 3. SCREEN NAVIGATION & PROGRESS STEPPER
  // ==========================================
  window.goToScreen = function (targetId) {
    sfxClick();
    const fromEl = document.getElementById(currentScreen);
    const toEl = document.getElementById(targetId);
    if (!fromEl || !toEl) return;

    fromEl.classList.add('fade-out');
    setTimeout(() => {
      fromEl.classList.add('hide');
      fromEl.classList.remove('fade-out');

      toEl.classList.remove('hide');
      currentScreen = targetId;
      updateStepper(targetId);

      // Play chime when entering confession letter screen
      if (targetId === 'confessScreen') {
        sfxChime();
      }
    }, 280);
  };

  function updateStepper(screenId) {
    const dots = document.querySelectorAll('.step-dot');
    const label = document.getElementById('stepLabel');
    dots.forEach(d => d.classList.remove('active'));

    const isOcean = isOceanTheme();
    const stepMap = isOcean ? {
      introScreen: { index: 0, text: 'Langkah 1/3: Halo 🌊' },
      preludeScreen: { index: 1, text: 'Langkah 2/3: Pengantar 🫧' },
      confessScreen: { index: 2, text: 'Langkah 3/3: Isi Hati 💙' },
      resultScreen: { index: 2, text: 'Official 💙' }
    } : {
      introScreen: { index: 0, text: 'Langkah 1/3: Halo' },
      preludeScreen: { index: 1, text: 'Langkah 2/3: Pengantar' },
      confessScreen: { index: 2, text: 'Langkah 3/3: Isi Hati' },
      resultScreen: { index: 2, text: 'Official 💖' }
    };

    const cur = stepMap[screenId] || { index: 0, text: '' };
    if (dots[cur.index]) dots[cur.index].classList.add('active');
    if (label) label.textContent = cur.text;
  }

  // ==========================================
  // 4. RUNAWAY "NO" BUTTON (SMART DODGE)
  // ==========================================
  function dodgeNoButton(e) {
    if (!noBtn) return;
    dodgeCount++;
    sfxDodge();

    const isOcean = isOceanTheme();
    const defaultTexts = isOcean ? [
      "Nggak dulu deh 😜🌊",
      "Eits, ga kena! 🌊🐬",
      "Yakin ga mau? 🥺💙",
      "Tombol ini rusak lho 🫧",
      "Pencet yang biru aja ya 💙",
      "Gabisa nolak pokoknya! 🌊💙"
    ] : [
      "Nggak dulu deh 😜",
      "Eits, ga kena! 😜",
      "Yakin ga mau? 🥺",
      "Tombol ini rusak lho 🤭",
      "Pencet yang pink aja ya 💖",
      "Gabisa nolak pokoknya! 😆"
    ];

    const cfg = window.CONFIG?.screens?.confess;
    const texts = (cfg?.noDodgeTexts && !isOcean) ? cfg.noDodgeTexts : defaultTexts;
    noBtn.textContent = texts[dodgeCount % texts.length];

    const btnWidth = noBtn.offsetWidth || 140;
    const btnHeight = noBtn.offsetHeight || 48;
    const margin = 20;

    const maxX = window.innerWidth - btnWidth - margin * 2;
    const maxY = window.innerHeight - btnHeight - margin * 2;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    if (e && e.clientX !== undefined) {
      cursorX = e.clientX;
      cursorY = e.clientY;
    } else if (e && e.touches && e.touches[0]) {
      cursorX = e.touches[0].clientX;
      cursorY = e.touches[0].clientY;
    }

    let newX, newY, attempts = 0;
    do {
      newX = margin + Math.random() * Math.max(maxX, 40);
      newY = margin + Math.random() * Math.max(maxY, 40);
      attempts++;
    } while (Math.hypot(newX - cursorX, newY - cursorY) < 160 && attempts < 12);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = '60';

    // Gradually grow and emphasize YES button
    if (yesBtn) {
      yesBtn.classList.add('grown');
      const currentScale = 1 + Math.min(dodgeCount * 0.08, 0.45);
      yesBtn.style.transform = `scale(${currentScale})`;
    }
  }

  if (noBtn) {
    noBtn.addEventListener('mouseenter', dodgeNoButton);
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeNoButton(e);
    });
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNoButton(e);
    }, { passive: false });
  }

  // ==========================================
  // 5. CELEBRATION / RESULT LOGIC
  // ==========================================
  window.acceptConfession = function () {
    const fromEl = document.getElementById('confessScreen');
    const toEl = document.getElementById('resultScreen');
    if (!fromEl || !toEl) return;

    sfxCelebration();

    // Play celebration audio element if available
    const yayAudio = document.getElementById('yaySfx');
    if (yayAudio) {
      try {
        yayAudio.currentTime = 0;
        yayAudio.play().catch(() => {});
      } catch (err) {}
    }

    fromEl.classList.add('fade-out');
    setTimeout(() => {
      fromEl.classList.add('hide');
      fromEl.classList.remove('fade-out');
      toEl.classList.remove('hide');
      currentScreen = 'resultScreen';
      updateStepper('resultScreen');

      // Hide runaway button if still hanging around
      if (noBtn) noBtn.style.display = 'none';

      // Set today's date on the relationship anniversary badge
      const annivEl = document.getElementById('anniversaryDate');
      if (annivEl) {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        annivEl.textContent = isOceanTheme()
          ? `Resmi Jadian: ${today.toLocaleDateString('id-ID', options)} 💙🌊`
          : `Resmi Jadian: ${today.toLocaleDateString('id-ID', options)} 💖`;
      }

      launchConfettiStorm();
    }, 280);
  };

  function launchConfettiStorm() {
    const isOcean = isOceanTheme();
    const colors = isOcean
      ? ['#00E5FF', '#00B4D8', '#0077B6', '#0284C7', '#03045E', '#90E0EF', '#CAF0F8', '#38BDF8', '#BAE6FD']
      : ['#FF5E89', '#FFB347', '#FF85A2', '#FFE4EC', '#E6396A', '#2DD4BF', '#F59E0B'];
    const emojis = isOcean
      ? ['💙', '🩵', '🫧', '🌊', '💎', '🐬', '🐳', '🪼', '🧊', '❄️']
      : ['💖', '🌸', '✨', '🎉', '🥰', '💕', '💍'];

    // Part 1: Confetti rectangles
    for (let i = 0; i < 90; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const size = 6 + Math.random() * 8;
        piece.style.width = `${size}px`;
        piece.style.height = `${size * 0.65}px`;
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4500);
      }, i * 25);
    }

    // Part 2: Floating emoji balloons
    for (let j = 0; j < 18; j++) {
      setTimeout(() => {
        const emoji = document.createElement('div');
        emoji.className = 'confetti-piece';
        emoji.textContent = emojis[j % emojis.length];
        emoji.style.fontSize = `${20 + Math.random() * 18}px`;
        emoji.style.left = `${Math.random() * 95}vw`;
        emoji.style.animationDuration = `${3.2 + Math.random() * 2}s`;
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 5500);
      }, j * 120);
    }
  }

  // ==========================================
  // 6. AUDIO ENGINE (LO-FI CHORD SYNTHESIZER)
  // ==========================================
  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        musicGain = audioCtx.createGain();
        musicGain.gain.value = window.CONFIG?.music?.volume || 0.65;
        musicGain.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Romantic progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
  const romanticChords = [
    [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
    [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
    [174.61, 261.63, 329.63, 349.23, 440.00], // Fmaj7
    [196.00, 261.63, 293.66, 392.00, 523.25]  // Gsus4 -> G
  ];
  let chordIndex = 0;

  function playLoFiChord(frequencies, duration = 3.6) {
    if (!audioCtx || !musicOn || !musicGain) return;

    activeChordOscs.forEach(o => {
      try { o.stop(); o.disconnect(); } catch (e) {}
    });
    activeChordOscs = [];

    const now = audioCtx.currentTime;
    frequencies.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for lo-fi warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.08 / frequencies.length, now + 0.4 + i * 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.2);

      osc.connect(noteGain);
      noteGain.connect(musicGain);

      osc.start(now + i * 0.04);
      osc.stop(now + duration + 0.2);
      activeChordOscs.push(osc);
    });
  }

  function loopMusicChords() {
    if (!musicOn || !audioCtx) return;
    const chordDuration = 3.6;
    playLoFiChord(romanticChords[chordIndex % romanticChords.length], chordDuration);
    chordIndex++;
    musicTimer = setTimeout(loopMusicChords, chordDuration * 1000);
  }

  function startMusicPlayback() {
    if (musicStarted) return;
    ensureAudioContext();
    musicStarted = true;

    const customUrl = window.CONFIG?.music?.customAudioUrl;
    if (window.CONFIG?.music?.useCustomAudio && customUrl) {
      if (!customAudioEl) {
        customAudioEl = new Audio(customUrl);
        customAudioEl.loop = true;
        customAudioEl.volume = window.CONFIG?.music?.volume || 0.65;
      }
      customAudioEl.play().catch(() => {});
    } else {
      loopMusicChords();
    }

    if (musicWidget) musicWidget.classList.remove('paused');
  }

  function toggleMusicPlayback() {
    ensureAudioContext();
    musicOn = !musicOn;

    if (musicOn) {
      if (customAudioEl) {
        customAudioEl.play().catch(() => {});
      } else {
        loopMusicChords();
      }
      if (musicWidget) {
        musicWidget.classList.remove('paused');
        document.getElementById('musicLabel').textContent = 'Musik';
      }
    } else {
      if (customAudioEl) {
        customAudioEl.pause();
      }
      if (musicTimer) clearTimeout(musicTimer);
      if (musicGain && audioCtx) {
        const now = audioCtx.currentTime;
        musicGain.gain.setValueAtTime(0, now);
      }
      if (musicWidget) {
        musicWidget.classList.add('paused');
        document.getElementById('musicLabel').textContent = 'Bisu';
      }
    }
  }

  if (musicWidget) {
    musicWidget.addEventListener('click', toggleMusicPlayback);
  }

  // Start audio on very first user interaction anywhere
  document.addEventListener('click', function onFirstInteraction() {
    if (window.CONFIG?.music?.enabled !== false && window.CONFIG?.music?.autoplayOnFirstClick !== false) {
      startMusicPlayback();
    }
    document.removeEventListener('click', onFirstInteraction);
  }, { once: true });

  // Sound Effects
  function sfxClick() {
    if (!audioCtx || !musicOn) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  function sfxDodge() {
    if (!audioCtx || !musicOn) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  function sfxChime() {
    if (!audioCtx || !musicOn) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = audioCtx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.035, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
    } catch (e) {}
  }

  function sfxCelebration() {
    if (!audioCtx || !musicOn) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = audioCtx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });
    } catch (e) {}
  }

  // ==========================================
  // 7. AMBIENT PARTICLES (CANVAS & SPARKLES)
  // ==========================================
  const canvas = document.getElementById('bgCanvas');
  if (canvas && window.CONFIG?.enableParticles !== false) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function createParticle() {
      const isOcean = isOceanTheme();
      const types = isOcean ? ['bubble', 'bubble', 'blueheart', 'stardust'] : ['heart', 'heart', 'star'];
      const oceanColors = ['#00E5FF', '#00B4D8', '#90E0EF', '#38BDF8', '#BAE6FD', '#FFFFFF'];
      const normalColors = ['#FF85A2', '#FFAAA6', '#FFC3A0', '#FFB347'];

      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 8 + Math.random() * 16,
        speedY: isOcean ? (0.8 + Math.random() * 1.5) : (0.6 + Math.random() * 1.2),
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: isOcean ? (0.35 + Math.random() * 0.5) : (0.2 + Math.random() * 0.4),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        type: types[Math.floor(Math.random() * types.length)],
        color: isOcean
          ? oceanColors[Math.floor(Math.random() * oceanColors.length)]
          : normalColors[Math.floor(Math.random() * normalColors.length)]
      };
    }

    for (let i = 0; i < 28; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function drawHeart(c, x, y, size) {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.fill();
    }

    function renderParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          particles[idx] = createParticle();
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'heart' || p.type === 'blueheart') {
          drawHeart(ctx, 0, 0, p.size);
        } else if (p.type === 'bubble') {
          // Floating Water Bubble with shine highlight
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Bubble specular reflection
          ctx.beginPath();
          ctx.arc(-p.size * 0.14, -p.size * 0.14, p.size * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        } else {
          // Stardust sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // Cursor Trail Sparkles
  if (window.CONFIG?.enableCursorTrail !== false) {
    let lastSparkleTime = 0;

    function spawnSparkle(x, y) {
      const now = Date.now();
      if (now - lastSparkleTime < 80) return;
      lastSparkleTime = now;

      const isOcean = isOceanTheme();
      const sparkleEmojis = isOcean
        ? ['🫧', '💙', '🩵', '💎', '🌊', '❄️', '🪼']
        : ['✨', '💖', '⭐', '🌸'];

      const el = document.createElement('div');
      el.className = 'cursor-sparkle';
      el.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      el.style.left = `${x - 8}px`;
      el.style.top = `${y - 8}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 750);
    }

    window.addEventListener('mousemove', (e) => spawnSparkle(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  // ==========================================
  // 8. COPY ROMANTIC RESPONSE HELPER
  // ==========================================
  if (copyResponseBtn) {
    copyResponseBtn.addEventListener('click', () => {
      sfxClick();
      const cfg = window.CONFIG;
      const isOcean = isOceanTheme();
      const textToCopy = isOcean
        ? `Hai ${cfg.senderName || 'Alpin'}! 💙 Aku udah buka websitemu dan aku mau banget jadi pacar kamu! 🥺💙💎 Oficial jadian nih sekarang! 🌊`
        : `Hai ${cfg.senderName || 'Alpin'}! 💖 Aku udah buka websitemu dan aku mau banget jadi pacar kamu! 🥰💍 Oficial jadian nih sekarang! ✨`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(isOcean ? "Pesan jawaban romantis berhasil disalin! 💙🌊" : "Pesan jawaban romantis berhasil disalin! 💖");
      }).catch(() => {
        showToast("Gagal menyalin pesan.");
      });
    });
  }

  function showToast(msg) {
    if (!toastNotification) return;
    toastNotification.textContent = msg;
    toastNotification.style.display = 'block';
    setTimeout(() => {
      toastNotification.style.display = 'none';
    }, 3200);
  }

  // ==========================================
  // 9. LIVE CUSTOMIZER MODAL & ACTIONS
  // ==========================================
  function openCustomizer() {
    sfxClick();
    populateCustomizerForm();
    if (modalOverlay) modalOverlay.classList.add('open');
  }

  function closeCustomizer() {
    sfxClick();
    if (modalOverlay) modalOverlay.classList.remove('open');
  }

  if (settingsToggleBtn) settingsToggleBtn.addEventListener('click', openCustomizer);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCustomizer);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCustomizer();
    });
  }

  function populateCustomizerForm() {
    const cfg = window.CONFIG;
    if (!cfg) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('cfgRecipientName', cfg.recipientName);
    setVal('cfgSenderName', cfg.senderName);
    setVal('cfgTheme', cfg.theme || 'rose');
    setVal('cfgWaPhone', cfg.whatsapp?.phoneNumber);
    setVal('cfgWaMsg', cfg.whatsapp?.message);
    setVal('cfgIntroTitle', cfg.screens?.intro?.title);
    setVal('cfgPreludeTitle', cfg.screens?.prelude?.title);

    const letterArea = document.getElementById('cfgLetter');
    if (letterArea && Array.isArray(cfg.screens?.confess?.letter)) {
      letterArea.value = cfg.screens.confess.letter.join('\n\n');
    }

    // Highlight theme buttons
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === (cfg.theme || 'rose'));
    });
  }

  // Theme selector buttons in modal: Click to Live Preview
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeSelect = document.getElementById('cfgTheme');
      if (themeSelect) themeSelect.value = btn.dataset.theme;
      
      // Update config and re-render texts/emojis live
      window.CONFIG.theme = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', btn.dataset.theme);
      initFromConfig();
    });
  });

  // Apply Changes Live
  if (applySettingsBtn) {
    applySettingsBtn.addEventListener('click', () => {
      sfxClick();
      const cfg = window.CONFIG;
      if (!cfg) return;

      cfg.recipientName = document.getElementById('cfgRecipientName')?.value || cfg.recipientName;
      cfg.senderName = document.getElementById('cfgSenderName')?.value || cfg.senderName;
      cfg.theme = document.getElementById('cfgTheme')?.value || cfg.theme;
      if (!cfg.whatsapp) cfg.whatsapp = {};
      cfg.whatsapp.phoneNumber = document.getElementById('cfgWaPhone')?.value || cfg.whatsapp.phoneNumber;
      cfg.whatsapp.message = document.getElementById('cfgWaMsg')?.value || cfg.whatsapp.message;

      if (!cfg.screens) cfg.screens = {};
      if (!cfg.screens.intro) cfg.screens.intro = {};
      cfg.screens.intro.title = document.getElementById('cfgIntroTitle')?.value || cfg.screens.intro.title;

      if (!cfg.screens.prelude) cfg.screens.prelude = {};
      cfg.screens.prelude.title = document.getElementById('cfgPreludeTitle')?.value || cfg.screens.prelude.title;

      if (!cfg.screens.confess) cfg.screens.confess = {};
      const rawLetter = document.getElementById('cfgLetter')?.value;
      if (rawLetter) {
        cfg.screens.confess.letter = rawLetter.split('\n\n').filter(p => p.trim().length > 0);
      }

      initFromConfig();
      closeCustomizer();
      showToast(isOceanTheme() ? "Template berhasil diperbarui! 🌊💙" : "Template berhasil diperbarui! 🌸");
    });
  }

  // Copy Config as JSON
  if (copyConfigBtn) {
    copyConfigBtn.addEventListener('click', () => {
      sfxClick();
      const code = `window.CONFIG = ${JSON.stringify(window.CONFIG, null, 2)};`;
      navigator.clipboard.writeText(code).then(() => {
        showToast(isOceanTheme() ? "Kode CONFIG berhasil disalin! 📋💙" : "Kode CONFIG berhasil disalin! 📋✨");
      }).catch(() => {
        showToast("Gagal menyalin konfigurasi.");
      });
    });
  }

  // Download Standalone Ready-to-Send HTML File
  if (downloadHtmlBtn) {
    downloadHtmlBtn.addEventListener('click', () => {
      sfxClick();
      generateAndDownloadStandaloneHtml();
    });
  }

  function generateAndDownloadStandaloneHtml() {
    const isOcean = isOceanTheme();
    const clonedConfig = JSON.stringify(window.CONFIG, null, 2);
    const htmlTemplate = `<!DOCTYPE html>
<html lang="id" data-theme="${window.CONFIG.theme || 'rose'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${isOcean ? `Ada yang mau ${window.CONFIG.senderName} bilang ke ${window.CONFIG.recipientName}... 💙🌊` : `Ada yang mau ${window.CONFIG.senderName} bilang ke ${window.CONFIG.recipientName}... 💖`}</title>
  <link rel="icon" href="${isOcean ? "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💙</text></svg>" : "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>"}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Canvas Background -->
  <canvas id="bgCanvas"></canvas>
  <div class="bg-orb bg-orb-1"></div>
  <div class="bg-orb bg-orb-2"></div>
  <div class="bg-orb bg-orb-3"></div>

  <!-- Music Widget -->
  <div class="music-widget" id="musicWidget" title="Putar / Jeda Musik">
    <div class="music-equalizer">
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
    </div>
    <span class="music-icon">${isOcean ? '🌊' : '🎵'}</span>
    <span id="musicLabel" style="font-size: 12px; font-weight: 700;">Musik</span>
  </div>

  <audio id="yaySfx" src="assets/audio/yay.mp3" preload="auto"></audio>

  <div class="stage">
    <div class="card">
      <div class="step-stepper">
        <div class="step-dots">
          <div class="step-dot active"></div>
          <div class="step-dot"></div>
          <div class="step-dot"></div>
        </div>
        <span id="stepLabel">${isOcean ? 'Langkah 1/3: Halo 🌊' : 'Langkah 1/3: Halo'}</span>
      </div>

      <!-- SCREEN 1: INTRO -->
      <div class="screen" id="introScreen">
        <div class="photo-container">
          <img class="screen-photo wiggle" id="introPhoto" src="${window.CONFIG.screens.intro.image}" alt="Cute Intro">
        </div>
        <div class="eyebrow-name" id="introEyebrow">${oceanizeEmoji(window.CONFIG.screens.intro.eyebrow || `Untuk ${window.CONFIG.recipientName} 🌸`)}</div>
        <h1 id="introTitle">${oceanizeEmoji(window.CONFIG.screens.intro.title)}</h1>
        <p class="subtitle" id="introSubtitle">${oceanizeEmoji(window.CONFIG.screens.intro.subtitle)}</p>
        <div class="btn-row">
          <button class="btn-primary" id="introBtn" onclick="goToScreen('preludeScreen')">${oceanizeEmoji(window.CONFIG.screens.intro.buttonText)}</button>
        </div>
      </div>

      <!-- SCREEN 2: PRELUDE -->
      <div class="screen hide" id="preludeScreen">
        <div class="photo-container">
          <img class="screen-photo wiggle" id="preludePhoto" src="${window.CONFIG.screens.prelude.image}" alt="Cute Prelude">
        </div>
        <h1 id="preludeTitle">${oceanizeEmoji(window.CONFIG.screens.prelude.title)}</h1>
        <p class="subtitle" id="preludeSubtitle">${oceanizeEmoji(window.CONFIG.screens.prelude.subtitle)}</p>
        <div class="btn-row">
          <button class="btn-primary" id="preludeBtn" onclick="goToScreen('confessScreen')">${oceanizeEmoji(window.CONFIG.screens.prelude.buttonText)}</button>
        </div>
      </div>

      <!-- SCREEN 3: CONFESSION -->
      <div class="screen hide" id="confessScreen">
        <div class="photo-container">
          <img class="screen-photo wiggle" id="confessPhoto" src="${window.CONFIG.screens.confess.image}" alt="Cute Confession">
        </div>
        <div class="letter-box">
          <div class="letter-scroll-area" id="mainLetterBox">
            <p class="letter-salutation" id="letterSalutation">${oceanizeEmoji(window.CONFIG.screens.confess.salutation)}</p>
            <div id="letterParagraphs"></div>
            <p class="letter-signature" id="letterSignature">${oceanizeEmoji(window.CONFIG.screens.confess.signature)}</p>
          </div>
        </div>
        <p class="scroll-hint" id="scrollHint">${oceanizeEmoji(window.CONFIG.screens.confess.scrollHint)}</p>
        <div class="btn-row">
          <button class="btn-primary" id="yesBtn" onclick="acceptConfession()">${oceanizeEmoji(window.CONFIG.screens.confess.yesButtonText)}</button>
          <button id="noBtn">${oceanizeEmoji(window.CONFIG.screens.confess.noButtonText)}</button>
        </div>
        <p class="hint" id="dodgeHint">${oceanizeEmoji(window.CONFIG.screens.confess.dodgeHint)}</p>
      </div>

      <!-- SCREEN 4: CELEBRATION -->
      <div class="screen hide" id="resultScreen">
        <div class="celebration-badge" id="resultBadge">${oceanizeEmoji(window.CONFIG.screens.result.badge)}</div>
        <div class="photo-container">
          <img class="screen-photo wiggle" id="resultPhoto" src="${window.CONFIG.screens.result.image}" alt="Celebration!">
        </div>
        <h1 id="resultTitle">${oceanizeEmoji(window.CONFIG.screens.result.title)}</h1>
        <p class="subtitle" id="resultMessage" style="font-weight: 600; margin-bottom: 8px;">${oceanizeEmoji(window.CONFIG.screens.result.message)}</p>
        <p class="subtitle" id="resultSubmessage" style="color: var(--primary-deep); font-weight: 700;">${oceanizeEmoji(window.CONFIG.screens.result.submessage)}</p>
        <div class="anniversary-card">
          <span>${isOcean ? '🌊' : '📅'}</span>
          <span id="anniversaryDate">${isOcean ? 'Resmi Jadian Hari Ini 💙🌊' : 'Resmi Jadian Hari Ini 💖'}</span>
        </div>
        <div class="btn-row" style="flex-direction: column;">
          <a class="btn-primary btn-whatsapp" id="whatsappBtn" target="_blank" rel="noopener noreferrer">${oceanizeEmoji(window.CONFIG.screens.result.whatsappBtnText)}</a>
          <button class="btn-secondary" id="copyResponseBtn">${oceanizeEmoji(window.CONFIG.screens.result.copyBtnText)}</button>
        </div>
      </div>
      <p class="signature" id="footerSignature">${oceanizeEmoji(`* made with all my love by ${window.CONFIG.senderName}`)}</p>
    </div>
  </div>

  <div id="toastNotification" style="display:none; position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#022B57; color:#fff; padding:10px 20px; border-radius:999px; font-size:13px; z-index:9999; box-shadow:0 6px 20px rgba(0,0,0,0.2);"></div>

  <script>
    window.CONFIG = ${clonedConfig};
  </script>
  <script src="script.js"></script>
</body>
</html>`;

    const blob = new Blob([htmlTemplate], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confession-${window.CONFIG.recipientName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(isOcean ? "File HTML kustom berhasil diunduh! 💾💙" : "File HTML kustom berhasil diunduh! 💾✨");
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', initFromConfig);
})();
