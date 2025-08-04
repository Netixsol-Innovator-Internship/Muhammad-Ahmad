// Input Elements
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

// Form Elements
const form = document.querySelector("form");

// Output elements
const yearsOutput = document.querySelector("#years");
const monthsOutput = document.querySelector("#months");
const daysOutput = document.querySelector("#days");

function getAge(dateOfBirth) {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = {
        years: 0,
        months: 0,
        days: 0
    };

    age.years = currentDate.getFullYear() - birthDate.getFullYear();
    age.months = currentDate.getMonth() - birthDate.getMonth();
    age.days = currentDate.getDate() - birthDate.getDate();

    // If born after today's date then decrease the month and increase the days after today
    if (age.days < 0) {
        age.months--;
        // Get the last day of the previous month
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        age.days += lastMonth.getDate();
    }

    // If born after current's month
    if (age.months < 0) {
        age.years--;
        age.months += 12;
    }

    return age;
}

// Validate when input Element is unfocused
function validateInput(inputElement) {
    let errorMessage;
    let hasError = false;

    // Clear previous error states
    inputElement.previousElementSibling.classList.remove("error-msg-label");
    inputElement.classList.remove("error-msg-input");
    inputElement.nextElementSibling.classList.add("hidden");

    // Case 1: Check whether user has entered anything or not
    if (inputElement.value == "") {
        errorMessage = "This field is required";
        hasError = true;
    }
    // Case 2: If invalid input is given
    else {
        // Case 2.1 For Day input
        if (inputElement.attributes.id.value == "day") {
            let value = parseInt(inputElement.value);
            if (!((value >= 1 && value <= 31))) {
                errorMessage = "Must be a valid day";
                hasError = true;
            }
        }

        // Case 2.2 For month input
        if (inputElement.attributes.id.value == "month") {
            let value = parseInt(inputElement.value);
            if (!(value >= 1 && value <= 12)) {
                errorMessage = "Must be a valid month";
                hasError = true;
            }
        }

        // Case 2.3 For year input
        if (inputElement.attributes.id.value == "year") {

            let value = inputElement.value;
            if (value.length != "4") {
                errorMessage = "Year must contain 4 digits.";
                hasError = true;
            }
            if (!(+value < new Date().getFullYear())) {
                errorMessage = "Must be in the past";
                hasError = true;
            }
        }
    }

    // Apply error styling if there's an error
    if (hasError) {
        // Add error message class on label element
        inputElement.previousElementSibling.classList.add("error-msg-label");
        // Add error message class on input Element
        inputElement.classList.add("error-msg-input");
        // Show paragraph with error message 
        inputElement.nextElementSibling.textContent = errorMessage;
        inputElement.nextElementSibling.classList.remove("hidden");
    }
}

function validateMonthDays() {

    let validDays = new Date(yearInput.value, monthInput.value, 0).getDate();
    let enteredDays = dayInput.value;

    if (enteredDays > validDays) {

        // Add error message class on label element
        dayInput.previousElementSibling.classList.add("error-msg-label");
        // Add error message class on input Element
        dayInput.classList.add("error-msg-input");
        // Show paragraph with error message 
        dayInput.nextElementSibling.textContent = "Must be a valid Date";
        dayInput.nextElementSibling.classList.remove("hidden");
        return false;
    }

    return true;

}

function animateValue(element, start, end, duration) {
    const range = end - start;
    let startTime = null;

    // Smoother ease-out-quart function for more natural feel
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        element.textContent = Math.floor(start + range * easedProgress);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end; // Ensure final value
        }
    }
    requestAnimationFrame(step);
}

function calculateAndDisplayAge() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Create date string in YYYY-MM-DD format
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const inputDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
        alert("Please enter a valid date");
        return;
    }

    // Calculate age
    const age = getAge(inputDate);

    // Display results
    // yearsOutput.textContent = age.years;
    // monthsOutput.textContent = age.months;
    // daysOutput.textContent = age.days;
    animateValue(yearsOutput, parseInt(yearsOutput.textContent) || 0, age.years, 1200);
    animateValue(monthsOutput, parseInt(monthsOutput.textContent) || 0, age.months, 1200);
    animateValue(daysOutput, parseInt(daysOutput.textContent) || 0, age.days, 1200);
}

form.addEventListener("blur", (e) => {
    let target = e.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }

    validateInput(target);
}, true)

// Add event listener for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate all input fields
    validateInput(dayInput);
    validateInput(monthInput);
    validateInput(yearInput);

    // Check if any validation errors exist
    const hasErrors = form.querySelector('.error-msg-input') !== null;

    // Only calculate age if there are no validation errors
    if (!hasErrors && validateMonthDays()) {
        calculateAndDisplayAge();
    }
});