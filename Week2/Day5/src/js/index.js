const root = document.querySelector("#root");

// Authentication utilities
const AuthManager = {
    // Initialize demo data
    initializeDemoData() {
        const users = this.getUsers();
        if (users.length === 0) {
            // Create demo user
            const demoUser = {
                id: "demo-user-1",
                fullName: "Demo User",
                email: "demo@quiz.com",
                password: "demo123",
                joinedDate: new Date().toISOString(),
                quizzes: [
                    { id: 1, name: "HTML Basics", score: 85, date: new Date().toISOString() },
                    { id: 2, name: "CSS Fundamentals", score: 92, date: new Date().toISOString() }
                ],
                totalScore: 177
            };
            
            localStorage.setItem('users', JSON.stringify([demoUser]));
        }
    },

    // Check if user is logged in
    isAuthenticated() {
        return localStorage.getItem('currentUser') !== null;
    },

    // Get current user data
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Remove password from stored session data for security
            const sessionUser = { ...user };
            delete sessionUser.password;
            localStorage.setItem('currentUser', JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }
        
        return { success: false, message: 'Invalid email or password' };
    },

    // Register new user
    register(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            joinedDate: new Date().toISOString(),
            quizzes: [],
            totalScore: 0
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login after registration
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));

        return { success: true, user: sessionUser };
    },

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        navigateToPage('home');
    },

    // Get all users from localStorage
    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }
};

// Simple router
const Router = {
    currentPage: 'home',
    
    navigate(page) {
        this.currentPage = page;
        this.render();
    },

    render() {
        root.innerHTML = "";
        
        // Check authentication for protected routes
        if (AuthManager.isAuthenticated()) {
            // User is logged in - show dashboard or other authenticated pages
            switch (this.currentPage) {
                case 'home':
                case 'dashboard':
                    root.appendChild(renderDashboardPage());
                    break;
                case 'quiz-selection':
                    root.appendChild(renderQuizSelectionPage());
                    break;
                case 'quiz':
                    root.appendChild(renderQuizPage());
                    break;
                case 'quiz-results':
                    root.appendChild(renderQuizResultsPage());
                    break;
                case 'review-answers':
                    root.appendChild(renderReviewIncorrectAnswersPage());
                    break;
                default:
                    root.appendChild(renderDashboardPage());
            }
        } else {
            // User is not logged in - show public pages only
            switch (this.currentPage) {
                case 'signin':
                    root.appendChild(renderSignInPage());
                    break;
                case 'signup':
                    root.appendChild(renderSignUpPage());
                    break;
                case 'home':
                default:
                    root.appendChild(renderHomePage());
            }
        }
        
        // Add event listeners after rendering
        this.addEventListeners();
    },

    addEventListeners() {
        // Get Started button on home page
        const getStartedBtn = document.getElementById('get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                if (AuthManager.isAuthenticated()) {
                    this.navigate('quiz-selection');
                } else {
                    this.navigate('signup');
                }
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('http')) {
                    e.preventDefault();
                    
                    if (href === 'index.html') {
                        this.navigate('home');
                    } else {
                        const page = href.replace('.html', '');
                        this.navigate(page);
                    }
                }
            });
        });

        // Form submissions
        this.addFormListeners();
        this.addAuthLinks();
    },

    addFormListeners() {
        // Sign in form
        const signInForm = document.querySelector('#root form');
        if (signInForm && this.currentPage === 'signin') {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }

                const result = AuthManager.login(email, password);
                
                if (result.success) {
                    this.navigate('dashboard');
                } else {
                    alert(result.message);
                }
            });
        }

        // Sign up form
        if (signInForm && this.currentPage === 'signup') {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const fullName = document.getElementById('full-name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                if (!fullName || !email || !password || !confirmPassword) {
                    alert('Please fill in all fields');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }

                if (password.length < 6) {
                    alert('Password must be at least 6 characters long');
                    return;
                }

                const result = AuthManager.register({
                    fullName,
                    email,
                    password
                });
                
                if (result.success) {
                    this.navigate('dashboard');
                } else {
                    alert(result.message);
                }
            });
        }
    },

    addAuthLinks() {
        // Add logout functionality if user is authenticated
        if (AuthManager.isAuthenticated()) {
            // Add logout button to navigation if it doesn't exist
            this.addLogoutButton();
        }
        // No longer adding auth buttons to home page
    },

    addLogoutButton() {
        const nav = document.querySelector('nav .flex.items-center.gap-6');
        if (nav && !document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'text-red-600 hover:text-red-700 font-medium';
            logoutBtn.textContent = 'Logout';
            logoutBtn.addEventListener('click', () => {
                AuthManager.logout();
            });
            
            nav.appendChild(logoutBtn);
        }
    }
};

// Global navigation function
function navigateToPage(page) {
    Router.navigate(page);
}

function renderHomePage() {
    const homePage = document.createElement("section");
    homePage.innerHTML = `<!-- Container -->
        <div class="max-w-screen-2xl mx-auto">
            <nav class="flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3">
                <a href="index.html"><img src="assets/svgs/logo.svg" alt="Logo"></a>
                <div class="flex items-center gap-6">
                    <ul class="hidden md:flex gap-6 items-center">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="#">Quizzes</a></li>
                        <li><a href="#">LeaderBoard</a></li>
                        <li><a href="#">Profile</a></li>
                    </ul>
                    <img src="assets/svgs/hamburger-menu.svg" class="h-6 md:hidden" alt="Open Sidebar">
                    <div class="bg-[#F0F2F5] rounded-md p-[6px]"><img src="assets/svgs/bell-icon.svg" alt="Notificaions">
                    </div>
                    <div><img src="assets/images/profile-pic-small.png" class="h-8" alt="Profile pic"></div>
                </div>
            </nav>
        </div>

        <!-- Container -->
        <div class="max-w-screen-xl mx-auto px-4">
            <!-- Hero Section -->
            <section
                class="relative min-h-[400px] my-10 rounded-xl p-4 bg-[url('assets/images/home-hero-img.png')] bg-cover bg-center">
                <!-- Dark overlay -->
                <div class="absolute inset-0 rounded-xl bg-black/40"></div>

                <div class="absolute top-[15%] min-[625px]:top-[30%] min-[815px]:top-[35%] w-full z-1 text-white p-8 ">
                    
                    <div class="w-full min-[815px]:max-w-[80%] mx-auto text-center flex flex-col gap-4">
                        <h1 class="text-3xl min-[815px]:text-5xl font-bold">Welcome to QuizMaster</h1>
                        <p>Test your knowledge with our engaging quizzes. Compete with friends and climb the
                            leaderboard.
                            Start your quiz journey today!
                        <p>
                            <button class="bg-[#0D78F2] hover:bg-blue-700 transition-all hover:scale-105 py-2 px-4 rounded-lg mt-2 cursor-pointer"
                                id="get-started-btn">Get Started</button>
                    </div>
                </div>
            </section>
            <div class="my-12">
                <h2 class="text-2xl md:text-3xl font-bold">Featured Quizzes</h2>
                <p class="text-[#121417] my-2">Challenge yourself with our top quizzes. Pick a category and start
                    playing!</p>
                <div class="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Card 1 -->
                    <div
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 hover:scale-105 transition-transform">
                        <img src="assets/svgs/clock.svg" alt="General Knowledge" class="h-[18px] mb-4">
                        <h3 class="font-semibold text-lg mb-2">General Knowledge</h3>
                        <p class="text-[#61738A] text-sm">Test your overall knowledge with fun and challenging
                            questions.</p>
                    </div>
                    <!-- Card 2 -->
                    <div
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 items-center hover:scale-105 transition-transform">
                        <img src="assets/svgs/trophy.svg" alt="Science & Tech" class="h-[18px] mb-4">
                        <h3 class="font-semibold text-lg mb-2">Science & Tech</h3>
                        <p class="text-[#61738A] text-sm">Explore quizzes on science, technology, and innovation.
                        </p>
                    </div>
                    <!-- Card 3 -->
                    <div
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 items-center hover:scale-105 transition-transform">
                        <img src="assets/svgs/progress-graph.svg" alt="History" class="h-[18px] mb-4">
                        <h3 class="font-semibold text-lg mb-2">History</h3>
                        <p class="text-[#61738A] text-sm">Dive into the past with quizzes on world history and
                            events.</p>
                    </div>
                </div>
            </div>
        </div>`
    return homePage;
}

function renderDashboardPage() {
    const currentUser = AuthManager.getCurrentUser();
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container 1536px-->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3\">
            <a href=\"index.html\"><img src=\"assets/svgs/logo.svg\" alt=\"Logo\"></a>
            <div class=\"flex items-center gap-6\">
                <ul class=\"hidden md:flex gap-6 items-center\">
                    <li><a href=\"index.html\">Home</a></li>
                    <li><a href=\"#\" onclick=\"navigateToPage('quiz-selection')\">Quizzes</a></li>
                    <li><a href=\"#\">LeaderBoard</a></li>
                    <li><a href=\"#\">Profile</a></li>
                </ul>
                <img src=\"assets/svgs/hamburger-menu.svg\" class=\"h-6 md:hidden\" alt=\"Open Sidebar\">
                <div class=\"bg-[#F0F2F5] rounded-md p-[6px]\"><img src=\"assets/svgs/bell-icon.svg\" alt=\"Notificaions\"></div>
                <div><img src=\"assets/images/profile-pic-small.png\" class=\"h-8\" alt=\"Profile pic\"></div>
            </div>
        </nav>
    </div>
    <div class=\"max-w-screen-lg mx-auto\">
        <section>
            <div class=\"my-6 space-y-[2px] flex flex-col items-center\">
                <img src=\"assets/images/profile-pic-big.png\" class=\"h-32 w-32\" alt=\"Profile Pic\">
                <p class=\"font-semibold text-lg\">${currentUser ? currentUser.fullName : 'Sophia Bennett'}</p>
                <p class=\"text-[#61738A] text-sm\">Quiz Enthusiast</p>
                <p class=\"text-[#61738A] text-[12px]\">Joined ${currentUser ? new Date(currentUser.joinedDate).getFullYear() : '2021'}</p>
            </div>
        </section>
        <div>
            <div class=\"flex gap-4 px-4 border-b border-b-[#DBE0E5]\">
                <div class=\"border-b-[3px] border-b-[#E5E8EB]\"><p class=\"py-1\">Activity</p></div>
                <div class=\"border-b-[3px] border-b-[#E5E8EB]\"><p class=\"py-1\">Profile</p></div>
            </div>
        </div>
    </div>`;
    return section;
}

function renderQuizResultsPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container -->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3\">
            <a href=\"index.html\"><img src=\"assets/svgs/logo.svg\" alt=\"Logo\"></a>
            <div class=\"flex items-center gap-6\">
                <ul class=\"hidden md:flex gap-6 items-center\">
                    <li><a href=\"index.html\">Home</a></li>
                    <li><a href=\"#\">Quizzes</a></li>
                    <li><a href=\"#\">LeaderBoard</a></li>
                    <li><a href=\"#\">Profile</a></li>
                </ul>
                <img src=\"assets/svgs/hamburger-menu.svg\" class=\"h-6 md:hidden\" alt=\"Open Sidebar\">
                <div class=\"bg-[#F0F2F5] rounded-md p-[6px]\"><img src=\"assets/svgs/bell-icon.svg\" alt=\"Notificaions\"></div>
                <div><img src=\"assets/images/profile-pic-small.png\" class=\"h-8\" alt=\"Profile pic\"></div>
            </div>
        </nav>
    </div>
    <div class=\"max-w-screen-xl mx-auto px-4\">
        <section class=\"flex flex-col items-center py-12\">
            <h1 class=\"text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center\">Quiz Results</h1>
            <div class=\"w-full max-w-4xl\">
                <div class=\"flex justify-between items-center mb-2\">
                    <span class=\"text-base font-medium text-gray-700\">Quiz Completed</span>
                    <span class=\"text-base font-medium text-gray-700\">100%</span>
                </div>
                <div class=\"relative bg-gray-300 h-2 rounded-full mb-8\">
                    <div class=\"absolute top-0 left-0 bg-black h-2 rounded-full w-full\"></div>
                </div>
                <div class=\"bg-[#F0F2F5] rounded-lg p-6 mb-8\">
                    <div class=\"text-base text-gray-700 mb-2\">Score</div>
                    <div class=\"text-2xl font-bold text-gray-900\" id=\"quiz-score\">8/10</div>
                </div>
                <div class=\"text-center mb-8 md:w-[90%] md:mx-auto\">
                    <p class=\"text-[#121417]\" id=\"quiz-message\">
                        Congratulations, Sarah! You've completed the quiz with a score of 8 out of 10. Your performance indicates a strong understanding of the subject matter. Keep up the excellent work!
                    </p>
                </div>
                <div class=\"flex flex-col items-center gap-4\">
                    <button onclick=\"navigateToPage('review-answers')\" class=\"px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium\" id=\"review-answers-btn\">Review Answers</button>
                    <button onclick=\"navigateToPage('quiz-selection')\" class=\"px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium\">Back to Quizzes</button>
                </div>
            </div>
        </section>
    </div>`;
    return section;
}

function renderQuizSelectionPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container -->
    <div class="max-w-screen-2xl mx-auto">
        <nav class="flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3">

            <div class="flex items-center gap-2 md:gap-4">
                <a href="index.html"><img src="assets/svgs/logo.svg" class="h-5" alt="Logo"></a>
                <ul class="hidden md:flex gap-6 items-center">
                    <li><button onclick="navigateToPage('dashboard')" class="hover:text-blue-600">Dashboard</button></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">My Quizzes</a></li>
                    <li><a href="#">Leaderboard</a></li>
                </ul>
                <img src="assets/svgs/hamburger-menu.svg" class="h-5 md:hidden" alt="Open Sidebar">
            </div>


            <div class="flex items-center gap-3 md:gap-6">

                <div class="bg-[#F0F2F5] focus:outline-1 focus:outline-gray-900 rounded-md flex items-center relative">
                    <img src="assets/svgs/search.svg" class="h-6" alt="search">
                    <input type="search" class="p-[3px] max-w-[75px] md:max-w-[100px] focus:outline-0"
                        placeholder="Search" name="search-quizzes" id="search-quizzes">
                </div>

                <div><img src="assets/images/profile-pic-small.png" class="h-5 md:h-8" alt="Profile pic"></div>
            </div>
        </nav>
    </div>

    <div class="max-w-screen-xl mx-auto px-4 md:px-8 py-12">

        
        <div class="space-y-4 my-6">
            <h2 class="text-4xl font-medium">Select a Quiz</h2>

            <!-- Quiz Filters -->
            <ul class="flex gap-3">
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">All</a></li>
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">HTML</a></li>
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">CSS</a></li>
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">JavaScript</a></li>
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">React</a></li>
                <li class="bg-[#F0F2F5] py-1 px-3 rounded-xl"><a href="#">Node.js</a></li>
            </ul>
        </div>

        <!-- Featured Quizzes Section -->
        <section class="my-12 w-full max-w-screen-lg">

            <h2 class="text-xl sm:text-2xl mb-4 sm:mb-6">Featured Quizzes</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                
                <!-- HTML -->
                <div class="flex flex-col p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">

                    <div class="self-center grow flex justify-center items-center">
                        <img src="assets/images/html.png" alt="HTML Quiz" class="max-w-full object-cover object-center">
                    </div>

                    <div class="p-3 sm:p-4 mt-auto">
                        <h3 class="font-bold text-base sm:text-lg mb-1 sm:mb-2">HTML</h3>
                        <p class="text-gray-600 text-xs sm:text-sm">Test your knowledge about HTML</p>
                    </div>
                </div>

                <!-- CSS -->
                <div class="flex flex-col p-2  bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">

                    <div class="self-center grow flex justify-center items-center">
                        <img src="assets/images/css.png" alt="CSS Quiz" class="max-w-full max-h-[200px] object-cover object-center">
                    </div>

                    <div class="p-3 sm:p-4 mt-auto">
                        <h3 class="font-bold text-base sm:text-lg mb-1 sm:mb-2">CSS</h3>
                        <p class="text-gray-600 text-xs sm:text-sm">Test your knowledge about CSS</p>
                    </div>
                </div>

                <!-- JavaScript -->
                <div class="flex flex-col p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1 cursor-pointer" onclick="navigateToPage('quiz')">

                    <div class="self-center grow flex justify-center items-center">
                        <img src="assets/images/javaScript.png" alt="JavaScript Quiz" class="max-w-full max-h-[200px] object-cover object-center">
                    </div>

                    <div class="p-3 sm:p-4 mt-auto">
                        <h3 class="font-bold text-base sm:text-lg mb-1 sm:mb-2">JavaScript</h3>
                        <p class="text-gray-600 text-xs sm:text-sm">Test your knowledge about JavaScript</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- All Quizzes Section -->
        <section class="my-12">
            <h2 class="text-xl sm:text-2xl mb-4 sm:mb-6">All Quizzes</h2>

            <div>
                <!-- HTML -->
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">HTML</h3>
                        <p class="text-[#61738A]">Test your overall knowledge with a mix of questions.</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="assets/images/html.png" class="max-h-[170px]" alt="HTML Logo">
                    </div>
                </article>

                <!-- CSS -->
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">CSS</h3>
                        <p class="text-[#61738A]">Test your overall knowledge with a mix of questions.</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="assets/images/css.png" class="max-h-[170px]" alt="HTML Logo">
                    </div>
                </article>

                <!-- JavaScript -->
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">JavaScript</h3>
                        <p class="text-[#61738A]">Test your overall knowledge with a mix of questions.</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="assets/images/javaScript.png" class="max-h-[170px]" alt="HTML Logo">
                    </div>
                </article>

                <!-- React -->
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">React</h3>
                        <p class="text-[#61738A]">Test your skills in building interactive UIs with React.</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="assets/images/react.jpg" class="max-h-[170px]" alt="React Logo">
                    </div>
                </article>

                <!-- Node.js -->
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="navigateToPage('quiz')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">Node.js</h3>
                        <p class="text-[#61738A]">Test your backend development knowledge with Node.js quizzes.</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="assets/images/nodejs.png" class="max-h-[170px]" alt="Node.js Logo">
                    </div>
                </article>
            </div>
        </section>

    </div>`;
    return section;
}

function renderQuizPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container -->
    <div class="max-w-screen-2xl mx-auto">
        <nav class="flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3">
            <a href="index.html"><img src="assets/svgs/logo.svg" alt="Logo"></a>
            <div class="flex items-center gap-6">
                <ul class="hidden md:flex gap-6 items-center">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#">Quizzes</a></li>
                    <li><a href="#">LeaderBoard</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
                <img src="assets/svgs/hamburger-menu.svg" class="h-6 md:hidden" alt="Open Sidebar">
                <div class="bg-[#F0F2F5] rounded-md p-[6px]"><img src="assets/svgs/bell-icon.svg" alt="Notificaions">
                </div>
                <div><img src="assets/images/profile-pic-small.png" class="h-8" alt="Profile pic"></div>
            </div>
        </nav>
    </div>

    <!-- Container -->
    <div class="max-w-screen-xl mx-auto">
        
        <!-- Quiz Section -->
        <div class="px-4 md:px-6 my-10">
            
            <!-- Progress Section -->
            <div class="space-y-3 mb-8">
                <h3 class="text-lg font-medium text-gray-700">Progress</h3>
                <div class="relative bg-[#DBE0E5] h-2 rounded-full">
                    <div class="absolute top-0 left-0 bg-black h-2 rounded-full w-[25%]"></div>
                </div>
                <p class="text-sm text-gray-600">Question 1 of 4</p>
            </div>

            <!-- Timer Section -->
            <div class="grid grid-cols-3 gap-2 md:gap-6 mb-8">

                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800">00</div>
                    <div class="text-sm text-[#121417]">Hours</div>
                </div>
                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800">00</div>
                    <div class="text-sm text-[#121417]">Minutes</div>
                </div>
                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800">00</div>
                    <div class="text-sm text-[#121417]">Seconds</div>
                </div>
            </div>

            <!-- Question Section -->
            <div class="bg-white rounded-lg p-6 mb-8">
                
                <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                    What is the Full Form of HTML?
                </h2>

                <!-- Answer Options -->
                <div class="space-y-4">
                    <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="radio" name="answer" value="london" class="mr-4 w-5 h-5 text-black">
                        <span class="text-gray-700">London</span>
                    </label>
                    
                    <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="radio" name="answer" value="paris" class="mr-4 w-5 h-5 text-black">
                        <span class="text-gray-700">Paris</span>
                    </label>
                    
                    <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="radio" name="answer" value="berlin" class="mr-4 w-5 h-5 text-black">
                        <span class="text-gray-700">Berlin</span>
                    </label>
                    
                    <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="radio" name="answer" value="rome" class="mr-4 w-5 h-5 text-black">
                        <span class="text-gray-700">Rome</span>
                    </label>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between items-center">
                <button onclick="navigateToPage('quiz-selection')" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Back to Quizzes
                </button>
                <button onclick="navigateToPage('quiz-results')" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Finish Quiz
                </button>
            </div>

        </div>

    </div>`;
    return section;
}

function renderReviewIncorrectAnswersPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container -->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3\">
            <a href=\"index.html\"><img src=\"assets/svgs/logo.svg\" alt=\"Logo\"></a>
            <div class=\"flex items-center gap-6\">
                <ul class=\"hidden md:flex gap-6 items-center\">
                    <li><a href=\"index.html\">Home</a></li>
                    <li><a href=\"#\">Quizzes</a></li>
                    <li><a href=\"#\">LeaderBoard</a></li>
                    <li><a href=\"#\">Profile</a></li>
                </ul>
                <img src=\"assets/svgs/hamburger-menu.svg\" class=\"h-6 md:hidden\" alt=\"Open Sidebar\">
                <div class=\"bg-[#F0F2F5] rounded-md p-[6px]\"><img src=\"assets/svgs/bell-icon.svg\" alt=\"Notificaions\"></div>
                <div><img src=\"assets/images/profile-pic-small.png\" class=\"h-8\" alt=\"Profile pic\"></div>
            </div>
        </nav>
    </div>
    <div class=\"max-w-screen-lg mx-auto px-4\">
        <section class=\"py-12\">
            <h1 class=\"text-2xl md:text-3xl font-bold text-gray-900 mb-8\">Review Incorrect Answers</h1>
            <div id=\"incorrect-answers-list\" class=\"space-y-8\">
                <!-- Example incorrect answer block, repeatable via JS -->
                <div class=\"space-y-2\">
                    <h2 class=\"text-lg font-semibold text-gray-800\">Question 1</h2>
                    <p class=\"text-base text-gray-700\">What is the capital of France?</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Your answer:</span> Berlin</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Correct answer:</span> Paris</p>
                </div>
                <div class=\"space-y-2\">
                    <h2 class=\"text-lg font-semibold text-gray-800\">Question 2</h2>
                    <p class=\"text-base text-gray-700\">Which planet is known as the Red Planet?</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Your answer:</span> Jupiter</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Correct answer:</span> Mars</p>
                </div>
                <div class=\"space-y-2\">
                    <h2 class=\"text-lg font-semibold text-gray-800\">Question 3</h2>
                    <p class=\"text-base text-gray-700\">What is the largest ocean on Earth?</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Your answer:</span> Indian Ocean</p>
                    <p class=\"text-base text-gray-700\"><span class=\"font-medium\">Correct answer:</span> Pacific Ocean</p>
                </div>
            </div>
            <div class=\"flex justify-end mt-12\">
                <button onclick=\"navigateToPage('quiz-selection')\" class=\"px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium\" id=\"back-to-quizzes-btn\">Back to Quizzes</button>
            </div>
        </section>
    </div>`;
    return section;
}

function renderSignInPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- navBar Container -->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"text-center my-4\">
            <a href=\"index.html\" class=\"font-semibold text-lg\">Quiz App</a>
        </nav>
    </div>
    <div class=\"max-w-screen-xl my-[100px] md:my-[40px] mx-auto px-6\">
        <h1 class=\"text-2xl font-bold text-center py-2 mb-8\">Welcome Back</h1>
        <div class=\"max-w-[448px] mx-auto\">
            <form class=\"space-y-4\">
                <input type=\"email\" placeholder=\"Email\" name=\"email\" id=\"email\" class=\"w-full border border-gray-300 bg-[#F0F2F5] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500\" required />
                <input type=\"password\" placeholder=\"Password\" name=\"password\" id=\"password\" class=\"w-full border border-gray-300 bg-[#F0F2F5] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500\" required />
                <button type=\"submit\" class=\"w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition-colors\">Sign In</button>
            </form>
            <div class=\"text-center mt-6\">
                <p class=\"text-gray-600\">Don't have an account? 
                    <button onclick=\"navigateToPage('signup')\" class=\"text-blue-600 hover:text-blue-700 font-medium\">Sign up here</button>
                </p>
            </div>
        </div>
    </div>`;
    return section;
}

function renderSignUpPage() {
    const section = document.createElement("section");
    section.innerHTML = `<!-- navBar Container -->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"text-center my-4\">
            <a href=\"index.html\" class=\"font-semibold text-lg\">Quiz App</a>
        </nav>
    </div>
    <div class=\"max-w-screen-xl my-[100px] md:my-[40px] mx-auto px-6\">
        <h1 class=\"text-2xl font-bold text-center py-2 mb-8\">Create your account</h1>
        <div class=\"max-w-[448px] mx-auto\">
            <form class=\"space-y-4\">
                <input type=\"text\" placeholder=\"Full Name\" name=\"full-name\" id=\"full-name\" class=\"w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500\" required />
                <input type=\"email\" placeholder=\"Email\" name=\"email\" id=\"email\" class=\"w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500\" required />
                <input type=\"password\" placeholder=\"Password (min 6 characters)\" name=\"password\" id=\"password\" class=\"w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500\" required minlength=\"6\" />
                <input type=\"password\" placeholder=\"Confirm Password\" name=\"confirm-password\" id=\"confirm-password\" class=\"w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500\" required />
                <button type=\"submit\" class=\"w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition-colors\">Sign Up</button>
            </form>
            <div class=\"text-center mt-6\">
                <p class=\"text-gray-600\">Already have an account? 
                    <button onclick=\"navigateToPage('signin')\" class=\"text-blue-600 hover:text-blue-700 font-medium\">Sign in here</button>
                </p>
            </div>
        </div>
    </div>`;
    return section;
}


document.addEventListener("DOMContentLoaded", () => {
    // Initialize demo data
    AuthManager.initializeDemoData();
    
    // Initialize the router
    Router.render();
});

