
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
const navUls = document.querySelectorAll("nav>ul, section>ul");

navUls.forEach(ul => {
    ul.addEventListener("click", (event) => {
        let target = event.target.closest("li[data-active]");
        if (!target) return;

        // Remove active from all links in this ul
        ul.querySelectorAll("li[data-active]").forEach(li => {
            li.dataset.active = "false";
        });

        // Set active to the clicked link
        target.dataset.active = "true";
    });
});

// Mobile Dropdown Functionality
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const parentLi = toggle.parentElement;
        const dropdownContent = parentLi.querySelector('.mobile-dropdown-content');
        const arrow = toggle.querySelector('img');
        
        // Toggle the dropdown
        dropdownContent.classList.toggle('hidden');
        
        // Rotate the arrow
        if (dropdownContent.classList.contains('hidden')) {
            arrow.style.transform = 'rotate(0deg)';
        } else {
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});