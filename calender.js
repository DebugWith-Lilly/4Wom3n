/* ==========================
   STATUS BAR TIME
========================== */

function updateTime() {

    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

}

updateTime();
setInterval(updateTime, 1000);


/* ==========================
   CONSTANTS
========================== */

const monthYear = document.getElementById("monthYear");
const calendarDates = document.getElementById("calendarDates");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const PERIOD_LENGTH = 5;
const CYCLE_LENGTH = 28;
const OVULATION_DAY = 14;
const FERTILE_WINDOW = 5;


/* ==========================
   GLOBAL VARIABLES
========================== */

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let periodStart = null;


/* ==========================
   DRAW CALENDAR
========================== */

function renderCalendar() {

    calendarDates.innerHTML = "";

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthName = new Date(currentYear, currentMonth)
        .toLocaleString("default", {
            month: "long"
        });

    monthYear.textContent = `${monthName} ${currentYear}`;

    /* Empty Spaces */

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");
        empty.classList.add("empty");

        calendarDates.appendChild(empty);

    }

    /* Dates */

    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");

        cell.classList.add("day");

        cell.textContent = day;

        const fullDate = new Date(
            currentYear,
            currentMonth,
            day
        );

        cell.dataset.date = fullDate.toISOString();

        /* Highlight Today */

        if (

            fullDate.getDate() === today.getDate() &&
            fullDate.getMonth() === today.getMonth() &&
            fullDate.getFullYear() === today.getFullYear()

        ) {

            cell.classList.add("today");

        }

        /* Show Cycle Prediction */

        if (periodStart) {

            colourCycle(cell, fullDate);

        }

        /* Select Period Start */

        cell.addEventListener("click", () => {

            periodStart = new Date(fullDate);

            renderCalendar();

        });

        calendarDates.appendChild(cell);

    }

}


/* ==========================
   COLOUR CYCLE
========================== */

function colourCycle(cell, date) {

    const diff = Math.floor(
        (date - periodStart) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) return;

    /* Period */

    if (diff < PERIOD_LENGTH) {

        cell.classList.add("period-day");

    }

    /* Fertile Window */

    if (

        diff >= OVULATION_DAY - 1 - FERTILE_WINDOW &&
        diff < OVULATION_DAY - 1

    ) {

        cell.classList.add("fertile-day");

    }

    /* Ovulation */

    if (diff === OVULATION_DAY - 1) {

        cell.classList.add("ovulation-day");

    }

}


/* ==========================
   MONTH NAVIGATION
========================== */

nextBtn.addEventListener("click", () => {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;
        currentYear++;

    }

    renderCalendar();

});

prevBtn.addEventListener("click", () => {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;
        currentYear--;

    }

    renderCalendar();

});


/* ==========================
   INITIALIZE
========================== */

renderCalendar();
