// =======================================================
// 1. FITUR COUNTDOWN TIMER (WAKTU MUNDUR)
// =======================================================

// Tentukan tanggal target acara (Silakan ganti tanggal ini sesuai keinginan)
const targetDate = new Date("Juli 11, 2026 09:00:00").getTime();

// Jalankan fungsi hitung mundur secara otomatis setiap 1 detik (1000 milidetik)
const countdownFunction = setInterval(function() {
    
    // Ambil waktu saat ini
    const now = new Date().getTime();
    
    // Hitung selisih jarak waktu antara target dengan waktu sekarang
    const distance = targetDate - now;
    
    // Perhitungan matematika konversi milidetik ke hari, jam, menit, dan detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // DOM Manipulation: Memperbarui tampilan angka di halaman HTML secara real-time
    // Menggunakan operator ternary agar angka di bawah 10 otomatis ditambahkan '0' di depannya (misal: 09, 08)
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    
    // Logika jika waktu hitung mundur ternyata sudah habis (melewati tanggal target)
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown-timer").innerHTML = `
            <div class='col-12'>
                <h4 class='text-warning fw-bold'>Acara Sedang / Telah Berlangsung!</h4>
            </div>`;
    }
}, 1000);


// =======================================================
// 2. FITUR RSVP FORM (SUBMIT & MODAL DINAMIS)
// =======================================================

const rsvpForm = document.getElementById("rsvpForm");

// Tangkap event submit pada form
rsvpForm.addEventListener("submit", function(event) {
    // Mencegah perilaku default HTML yang selalu melakukan reload halaman setiap form dikirim
    event.preventDefault();
    
    // Mengambil nilai inputan dari formulir menggunakan properti .value
    const namaUser = document.getElementById("inputNama").value;
    const emailUser = document.getElementById("inputEmail").value;
    const institusiUser = document.getElementById("inputInstitusi").value;
    
    // Mengubah konten teks di dalam Modal Sukses secara dinamis dengan manipulasi DOM
    document.getElementById("modalUser").innerText = `Halo, ${namaUser}!`;
    document.getElementById("modalMessage").innerText = `Terima kasih telah mendaftar. E-Tiket konfirmasi resmi telah kami kirimkan ke ${emailUser}. Sampai jumpa di acara Semnas 2026, perwakilan dari ${institusiUser}!`;
    
    // Memanggil dan memunculkan Modal Bootstrap secara programatik lewat JS API
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Membersihkan seluruh kolom input form (reset) setelah pendaftaran dinyatakan berhasil
    rsvpForm.reset();
});