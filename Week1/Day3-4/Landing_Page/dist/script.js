
// Mobile Navbar functionality
// Get elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const overlay = document.getElementById('overlay');

// Open sidebar
hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

// Close sidebar
closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});




// Toggle theme functionality
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'dark') {
    updateToggleIcons('light');
} else {
    htmlElement.classList.add('dark');
    updateToggleIcons('dark');
}

// Function to update toggle button icons
function updateToggleIcons(theme) {
    const desktopImg = themeToggleDesktop.querySelector('img');
    const mobileImg = themeToggleMobile.querySelector('img');

    if (theme === 'light') {
        desktopImg.src = '../assets/svgs/lightmode-toggle.svg';
        mobileImg.src = '../assets/svgs/lightmode-toggle.svg';
        desktopImg.alt = 'Switch to Light Mode';
        mobileImg.alt = 'Switch to Light Mode';
    } else {
        desktopImg.src = '../assets/svgs/darkmode-toggle.svg';
        mobileImg.src = '../assets/svgs/darkmode-toggle.svg';
        desktopImg.alt = 'Switch to Dark Mode';
        mobileImg.alt = 'Switch to Dark Mode';
    }
}

// Function to toggle theme
function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'dark');
        updateToggleIcons('light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'light');
        updateToggleIcons('dark');
    }
}

// Add event listeners to both toggle buttons
themeToggleDesktop.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);