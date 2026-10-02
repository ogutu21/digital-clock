// ========================================
// DIGITAL CLOCK
// ========================================


// ========================================
// ELEMENTS
// ========================================

const timeElement = document.getElementById("time");
const periodElement = document.getElementById("period");
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");

const themeButton = document.getElementById("themeButton");
const formatButton = document.getElementById("formatButton");


// ========================================
// SETTINGS
// ========================================

// Start in 12-hour format
let is24Hour = false;


// ========================================
// UPDATE CLOCK
// ========================================

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    // ========================================
    // 12 / 24 HOUR FORMAT
    // ========================================

    let displayHours;
    let period;

    if (is24Hour) {

        displayHours = hours;

        period = "24-HOUR";

    } else {

        period = hours >= 12 ? "PM" : "AM";

        displayHours = hours % 12;

        if (displayHours === 0) {
            displayHours = 12;
        }
    }


    // ========================================
    // ADD LEADING ZERO
    // ========================================

    const formattedHours =
        String(displayHours).padStart(2, "0");

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(seconds).padStart(2, "0");


    // ========================================
    // DISPLAY TIME
    // ========================================

    timeElement.textContent =
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    periodElement.textContent = period;


    // ========================================
    // DISPLAY DAY
    // ========================================

    dayElement.textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long"
        });


    // ========================================
    // DISPLAY DATE
    // ========================================

    dateElement.textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
}


// ========================================
// SWITCH TIME FORMAT
// ========================================

formatButton.addEventListener("click", function () {

    is24Hour = !is24Hour;

    updateClock();

    if (is24Hour) {

        formatButton.textContent =
            "Switch to 12-hour";

    } else {

        formatButton.textContent =
            "Switch to 24-hour";
    }
});


// ========================================
// DARK MODE
// ========================================

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️";

        localStorage.setItem(
            "digitalClockTheme",
            "dark"
        );

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "digitalClockTheme",
            "light"
        );
    }
});


// ========================================
// LOAD SAVED THEME
// ========================================

const savedTheme =
    localStorage.getItem("digitalClockTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.textContent = "☀️";

} else {

    themeButton.textContent = "🌙";
}


// ========================================
// START CLOCK
// ========================================

// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);