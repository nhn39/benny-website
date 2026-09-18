// =====================================================
// IMPORTANT DATES
// =====================================================

// Benny was born sometime in April 2016.
// April 1 is used only as the technical reference date.
const BENNY_BIRTH = new Date(2016, 3, 1, 0, 0, 0);

// Vet prognosis: September 8, 2026
const PROGNOSIS_DATE = new Date(2026, 8, 8, 0, 0, 0);

// Estimated 1–2 month window
const ONE_MONTH_MARK = new Date(2026, 9, 8, 0, 0, 0);
const TWO_MONTH_MARK = new Date(2026, 10, 8, 0, 0, 0);

// Default selection = 2 months
let selectedEstimate = 2;

// =====================================================
// HELPERS
// =====================================================

function pad(number) {
    return String(number).padStart(2, "0");
}

function setFlipValue(id, value) {
    const card = document.getElementById(id);

    if (!card) return;

    const newValue = String(value);

    // Don't animate if number didn't change
    if (card.textContent === newValue) {
        return;
    }

    card.textContent = newValue;

    // Restart flip animation
    card.classList.remove("flip");

    void card.offsetWidth;

    card.classList.add("flip");
}

// =====================================================
// BENNY AGE
// =====================================================

function getAge(start, end) {
    let years = end.getFullYear() - start.getFullYear();

    let months = end.getMonth() - start.getMonth();

    let days = end.getDate() - start.getDate();

    let hours = end.getHours() - start.getHours();

    let minutes = end.getMinutes() - start.getMinutes();

    let seconds = end.getSeconds() - start.getSeconds();

    // Borrow from minutes
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    // Borrow from hours
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    // Borrow from days
    if (hours < 0) {
        hours += 24;
        days--;
    }

    // Borrow from previous month
    if (days < 0) {
        const daysInPreviousMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();

        days += daysInPreviousMonth;

        months--;
    }

    // Borrow from years
    if (months < 0) {
        months += 12;
        years--;
    }

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
    };
}

function updateAgeClock() {
    const now = new Date();

    const age = getAge(BENNY_BIRTH, now);

    setFlipValue("age-years", pad(age.years));

    setFlipValue("age-months", pad(age.months));

    setFlipValue("age-days", pad(age.days));

    setFlipValue("age-hours", pad(age.hours));

    setFlipValue("age-minutes", pad(age.minutes));

    setFlipValue("age-seconds", pad(age.seconds));
}

// =====================================================
// DURATION
// =====================================================

function getDuration(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

    return {
        days: Math.floor(totalSeconds / 86400),

        hours: Math.floor((totalSeconds % 86400) / 3600),

        minutes: Math.floor((totalSeconds % 3600) / 60),

        seconds: totalSeconds % 60,
    };
}

// =====================================================
// PROGNOSIS CLOCK
// =====================================================

function updatePrognosisClock() {
    const now = new Date();

    const title = document.getElementById("prognosis-title");

    const status = document.getElementById("prognosis-status");

    // -----------------------------------------
    // Which estimate did visitor select?
    // -----------------------------------------

    const targetDate = selectedEstimate === 1 ? ONE_MONTH_MARK : TWO_MONTH_MARK;

    let duration;

    // -----------------------------------------
    // BEFORE SELECTED DATE
    // Countdown
    // -----------------------------------------

    if (now < targetDate) {
        duration = getDuration(targetDate - now);

        if (title) {
            title.textContent = "BENNY’S ESTIMATED TIME REMAINING";
        }

        if (status) {
            if (selectedEstimate === 1) {
                status.textContent = "TO 1-MONTH ESTIMATE · OCT 8, 2026";
            } else {
                status.textContent = "TO 2-MONTH ESTIMATE · NOV 8, 2026";
            }
        }
    }

    // -----------------------------------------
    // AFTER SELECTED DATE
    // Count upward
    // -----------------------------------------
    else {
        duration = getDuration(now - targetDate);

        if (title) {
            title.textContent = "BEYOND THE ESTIMATE";
        }

        if (status) {
            if (selectedEstimate === 1) {
                status.textContent = "TIME BEYOND THE 1-MONTH ESTIMATE";
            } else {
                status.textContent = "TIME BEYOND THE 2-MONTH ESTIMATE";
            }
        }
    }

    // -----------------------------------------
    // Update clock
    // -----------------------------------------

    setFlipValue("prog-days", pad(duration.days));

    setFlipValue("prog-hours", pad(duration.hours));

    setFlipValue("prog-minutes", pad(duration.minutes));

    setFlipValue("prog-seconds", pad(duration.seconds));

    updateTimeline(now);
}

// =====================================================
// OCTOBER 8 → NOVEMBER 8 TIMELINE
// =====================================================

function updateTimeline(now) {
    const progress = document.getElementById("window-progress");

    const marker = document.getElementById("window-marker");

    if (!progress || !marker) {
        return;
    }

    const windowLength = TWO_MONTH_MARK - ONE_MONTH_MARK;

    const elapsed = now - ONE_MONTH_MARK;

    let percentage = (elapsed / windowLength) * 100;

    // Keep between 0% and 100%
    percentage = Math.max(0, Math.min(100, percentage));

    progress.style.width = percentage + "%";

    marker.style.left = percentage + "%";
}

// =====================================================
// 1 MONTH / 2 MONTH SELECTOR
// =====================================================

const estimateButtons = document.querySelectorAll(".estimate-option");

estimateButtons.forEach((button) => {
    button.addEventListener("click", function () {
        // Read data-months="1" or "2"
        selectedEstimate = Number(button.dataset.months);

        // Remove active from both
        estimateButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Highlight selected one
        button.classList.add("active");

        // Immediately update clock
        updatePrognosisClock();
    });
});

// =====================================================
// RUN EVERYTHING
// =====================================================

function updateCounters() {
    updateAgeClock();

    updatePrognosisClock();
}

// Run immediately when page loads
updateCounters();

// Update every second
setInterval(updateCounters, 1000);
