
// Drop Down Functionality
const dropDown = document.querySelector("#dropdown")
const separator = document.querySelector("#separator");
const toggleDropDownBtn = document.querySelector("#toggle-dropdown-btn");
const toggleDropDownImg = document.querySelector("#toggle-dropdown-img");

let dropDownState = "close";

function toggleDropDown () {

    if (dropDownState == "close") {
        separator.classList.remove("hidden")
        dropDown.classList.remove("hidden");
        toggleDropDownImg.src = "assets/svgs/hamburger-menu-close.svg";

        dropDownState = "open";
    }
    else {
        separator.classList.add("hidden")
        dropDown.classList.add("hidden");
        toggleDropDownImg.src = "assets/svgs/hamburger-menu-open.svg";

        dropDownState = "close";
    }
}

toggleDropDownBtn.addEventListener("click", () => {
    toggleDropDown();
});

// Activate Links functionality
let activeLink = document.querySelector(`li[data-active="true"]`);
const uls = document.querySelectorAll("ul");

uls.forEach(ul => {
    ul.addEventListener("click", (event) => {
        let target = event.target.closest("li");

        if (!(target instanceof HTMLLIElement)) return;

        activeLink.dataset.active = "false";

        activeLink = target;

        activeLink.dataset.active = "true";
    })
})