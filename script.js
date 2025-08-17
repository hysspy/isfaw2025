// Mengambil semua elemen HTML yang dibutuhkan sekaligus
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Tanggal target festival
const targetDate = new Date('2025-08-17T23:59:00');

// Fungsi untuk menambahkan '0' di depan angka di bawah 10 (misal: 7 -> 07)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Fungsi utama untuk memperbarui countdown
function updateCountdown() {
    const now = new Date();
    const diffInMilliseconds = targetDate - now;

    // Jika waktu sudah lewat, hentikan interval dan set semua angka ke 00
    if (diffInMilliseconds <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        clearInterval(countdownInterval); // Menghentikan countdown
        return; // Keluar dari fungsi
    }

    // Konversi selisih waktu menjadi hari, jam, menit, dan detik
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    // Memperbarui teks pada elemen HTML dengan format yang sudah diperbaiki
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
}

// =======================================================
// INTI DARI SCRIPT: Menjalankan countdown
// =======================================================

// 1. Panggil fungsi sekali di awal agar tidak ada jeda 1 detik
updateCountdown();

// 2. Jalankan fungsi updateCountdown setiap 1 detik (1000 milidetik)
const countdownInterval = setInterval(updateCountdown, 1000);

// =======================================================
// EFEK SCROLL REVEAL UNTUK SECTION
// =======================================================

// Pilih semua section yang ingin dianimasikan
const allSections = document.querySelectorAll('section');

// Buat 'observer' baru
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Jika section masuk ke dalam viewport (terlihat di layar)
        if (entry.isIntersecting) {
            // Tambahkan class 'visible' untuk memicu animasi CSS
            entry.target.classList.add('visible');
            // Hentikan pengamatan pada section ini agar animasi tidak berulang
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Memicu animasi saat 10% dari section terlihat
});

// Mulai amati setiap section
allSections.forEach(section => {
    sectionObserver.observe(section);
});