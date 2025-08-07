// Billing
const billInput = document.querySelector("#bill");
const billInputError = document.querySelector("#bill-error");

// Number of People
const numOfPeopleInput = document.querySelector("#number-of-people");
const numOfPeopleError = document.querySelector("#number-of-people-error");

const tipBtnContainer = document.querySelector("#tip-btn-container");

// Tip Selection
const tipPerPerson = document.querySelector("#tip-per-person");
const tipTotal = document.querySelector("#tip-total");

// Custom Tip
const customTip = document.querySelector("#custom-tip");

// Reset Button
const resetButton = document.querySelector("#reset-btn")

// Store which tip button is selected
let selectedTipButton;
// Store the tip percentage
let selectedTip;

// Backgrounds of Active and Non Active Buttons
let activeButtonBG = "bg-[#25bfab]";
let nonActiveButtonBG = "bg-[#00474b]";

function calculateTip(customValue) {

    let billAmount = parseFloat(billInput.value);
    let numOfPeople = parseFloat(numOfPeopleInput.value);

    if (billAmount && numOfPeople && billAmount > 1 && numOfPeople > 1) {

        let tip;

        if (customValue) {
            tip = customValue;
        }

        else if (selectedTip) {
            tip = (billAmount * selectedTip) / 100;
        }

        else {
            return;
        }

        tipPerPerson.textContent = tip.toFixed(2);
        tipTotal.textContent = (tip * numOfPeople).toFixed(2);
    }
}

customTip.addEventListener("input", (e) => {

    let customValue = parseFloat(e.target.value);

    if (selectedTipButton) {
        selectedTipButton.classList.remove(activeButtonBG);
        selectedTipButton.classList.add(nonActiveButtonBG);
    }

    calculateTip(customValue);
})

// Reset Everything when resetButton is being clicked
resetButton.addEventListener("click", () => {
    // Reset Billing 
    billInput.value = "";
    billInput.classList.remove("border-[1px]", "border-red-500");
    billInputError.textContent = ""

    // Reset Number of People
    numOfPeopleInput.value = "";
    numOfPeopleInput.classList.remove("border-[1px]", "border-red-500");
    numOfPeopleError.textContent = "";

    // Reset Selected Buttons
    if (selectedTipButton) {
        selectedTipButton.classList.remove(activeButtonBG);
        selectedTipButton.classList.add(nonActiveButtonBG);
    }

    // Reset Tip values
    tipPerPerson.textContent = "0.00";
    tipTotal.textContent = "0.00";
})

// Show error if numOfPeopleInput is left empty or less than 1
numOfPeopleInput.addEventListener("blur", (e) => {
    let value = parseFloat(e.target.value);

    if (!value) {
        numOfPeopleError.textContent = "Can't be zero";
        numOfPeopleError.classList.remove("hidden");
        numOfPeopleInput.className += " border-[1px] border-red-500";
    }
    else if (value <= 0) {
        numOfPeopleError.textContent = "Can't be less than 1";
        numOfPeopleError.classList.remove("hidden");
        numOfPeopleInput.className += " border-[1px] border-red-500";
    }
    else {
        numOfPeopleError.classList.add("hidden");
        numOfPeopleInput.classList.remove("border-[1px]", "border-red-500");

        calculateTip();
    }
})

// Load tip values as user enters number of people 
numOfPeopleInput.addEventListener("input", () => {
    calculateTip();
})

// Load tip values as user enters bill amount
billInput.addEventListener("input", () => {
    calculateTip();
})

// Show error on invalid value in Bill input
billInput.addEventListener("blur", (e) => {

    let value = parseFloat(e.target.value);

    if (!value) {
        billInputError.textContent = "Can't be zero";
        billInputError.classList.remove("hidden");
        billInput.className += " border-[1px] border-red-500";
    }
    else if (value <= 0) {
        billInputError.textContent = "Can't be less than 1";
        billInputError.classList.remove("hidden");
        billInput.className += " border-[1px] border-red-500";
    }
    else {
        billInputError.classList.add("hidden");
        billInput.classList.remove("border-[1px]", "border-red-500");

        calculateTip();
    }
})

tipBtnContainer.addEventListener("click", (e) => {
    let target = e.target;

    if (!(target instanceof HTMLButtonElement)) {
        return;
    }

    // Remove styling of previous button if some button was selected before
    if (selectedTipButton) {
        selectedTipButton.classList.remove(activeButtonBG);
        selectedTipButton.classList.add(nonActiveButtonBG);
    }

    selectedTipButton = target;

    selectedTipButton.classList.remove(nonActiveButtonBG);
    selectedTipButton.classList.add(activeButtonBG);

    let tipInPercentage = parseFloat(selectedTipButton.textContent.slice(0, -1));
    selectedTip = tipInPercentage;

    calculateTip();

})
