// =======================================================
// 1. FITUR COUNTDOWN TIMER (WAKTU MUNDUR)
// =======================================================

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5);
targetDate.setHours(9, 0, 0, 0);
const targetTime = targetDate.getTime();

const countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    timer: document.getElementById("countdown-timer")
};

if (countdownElements.days && countdownElements.hours && countdownElements.minutes && countdownElements.seconds) {
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElements.days.innerText = days < 10 ? "0" + days : days;
        countdownElements.hours.innerText = hours < 10 ? "0" + hours : hours;
        countdownElements.minutes.innerText = minutes < 10 ? "0" + minutes : minutes;
        countdownElements.seconds.innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            if (countdownElements.timer) {
                countdownElements.timer.innerHTML = `
                    <div class='col-12'>
                        <h4 class='text-warning fw-bold'>Acara Sedang / Telah Berlangsung!</h4>
                    </div>`;
            }
        }
    }, 1000);
}

// =======================================================
// 2. FITUR RSVP FORM (SUBMIT & MODAL DINAMIS)
// =======================================================

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const namaUser = document.getElementById("inputNama").value;
        const emailUser = document.getElementById("inputEmail").value;
        const institusiUser = document.getElementById("inputInstitusi").value;

        document.getElementById("modalUser").innerText = `Halo, ${namaUser}!`;
        document.getElementById("modalMessage").innerText = `Terima kasih telah mendaftar. E-Tiket konfirmasi resmi telah kami kirimkan ke ${emailUser}. Sampai jumpa di acara Semnas 2026, perwakilan dari ${institusiUser}!`;

        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        rsvpForm.reset();
    });
}

// =======================================================
// 3. FITUR DARK MODE / LIGHT MODE TOGGLE
// =======================================================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);

    if (themeToggle) {
        themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    }
}

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme === "dark"
    ? "dark"
    : savedTheme === "light"
        ? "light"
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

const speakerCards = document.querySelectorAll('[data-speaker]');
if (speakerCards.length > 0) {
    const params = new URLSearchParams(window.location.search);
    const selectedSpeaker = params.get("speaker");

    if (selectedSpeaker) {
        speakerCards.forEach((card) => {
            const matches = card.getAttribute("data-speaker") === selectedSpeaker;
            card.style.display = matches ? "block" : "none";
        });
    }
}