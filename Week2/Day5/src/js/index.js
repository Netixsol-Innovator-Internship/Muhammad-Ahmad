const root = document.querySelector("#root");

// Quiz data storage
const QuizData = {
    quizzes: [
        {
            id: 'html',
            title: 'HTML',
            description: 'Test your knowledge about HTML',
            image: 'assets/images/html.png',
            questions: [
                {
                    question: "What does HTML stand for?",
                    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                    correct: 0
                },
                {
                    question: "Which HTML element is used for the largest heading?",
                    options: ["<h6>", "<h1>", "<heading>", "<head>"],
                    correct: 1
                },
                {
                    question: "Which attribute is used to provide a unique identifier for an HTML element?",
                    options: ["class", "name", "id", "key"],
                    correct: 2
                },
                {
                    question: "Which HTML element is used to create a hyperlink?",
                    options: ["<link>", "<a>", "<href>", "<url>"],
                    correct: 1
                },
                {
                    question: "What is the correct HTML element for inserting a line break?",
                    options: ["<break>", "<lb>", "<br>", "<newline>"],
                    correct: 2
                },
                {
                    question: "Which HTML attribute specifies an alternate text for an image?",
                    options: ["title", "alt", "src", "text"],
                    correct: 1
                },
                {
                    question: "What is the correct HTML for creating a checkbox?",
                    options: ["<input type='check'>", "<input type='checkbox'>", "<checkbox>", "<check>"],
                    correct: 1
                },
                {
                    question: "Which HTML element defines navigation links?",
                    options: ["<navigate>", "<nav>", "<navigation>", "<menu>"],
                    correct: 1
                },
                {
                    question: "What is the correct HTML for making a text bold?",
                    options: ["<bold>", "<b>", "<strong>", "Both <b> and <strong>"],
                    correct: 3
                },
                {
                    question: "Which HTML element is used to specify a footer for a document?",
                    options: ["<bottom>", "<footer>", "<end>", "<foot>"],
                    correct: 1
                }
            ]
        },
        {
            id: 'css',
            title: 'CSS',
            description: 'Test your knowledge about CSS',
            image: 'assets/images/css.png',
            questions: [
                {
                    question: "What does CSS stand for?",
                    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
                    correct: 1
                },
                {
                    question: "Which HTML attribute is used to define inline styles?",
                    options: ["class", "style", "styles", "font"],
                    correct: 1
                },
                {
                    question: "Which CSS property is used to change the text color?",
                    options: ["text-color", "color", "font-color", "text-style"],
                    correct: 1
                },
                {
                    question: "How do you select an element with id 'demo' in CSS?",
                    options: [".demo", "#demo", "demo", "*demo"],
                    correct: 1
                },
                {
                    question: "Which CSS property controls the text size?",
                    options: ["text-size", "font-size", "text-style", "font-style"],
                    correct: 1
                },
                {
                    question: "How do you make text bold in CSS?",
                    options: ["font-weight: bold", "text-decoration: bold", "font-style: bold", "text-weight: bold"],
                    correct: 0
                },
                {
                    question: "Which CSS property is used to change the background color?",
                    options: ["bgcolor", "background-color", "color", "background"],
                    correct: 1
                },
                {
                    question: "How do you add a border to an element in CSS?",
                    options: ["border: 1px solid black", "border-width: 1px", "border-color: black", "outline: 1px"],
                    correct: 0
                },
                {
                    question: "Which CSS property is used to control the spacing between elements?",
                    options: ["padding", "margin", "spacing", "gap"],
                    correct: 1
                },
                {
                    question: "What is the default value of the position property in CSS?",
                    options: ["relative", "absolute", "static", "fixed"],
                    correct: 2
                }
            ]
        },
        {
            id: 'javascript',
            title: 'JavaScript',
            description: 'Test your knowledge about JavaScript',
            image: 'assets/images/javaScript.png',
            questions: [
                {
                    question: "Which company developed JavaScript?",
                    options: ["Microsoft", "Netscape", "Google", "Apple"],
                    correct: 1
                },
                {
                    question: "What is the correct way to write a JavaScript array?",
                    options: ["var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
                    correct: 1
                },
                {
                    question: "How do you write 'Hello World' in an alert box?",
                    options: ["alertBox('Hello World')", "msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
                    correct: 2
                },
                {
                    question: "Which event occurs when the user clicks on an HTML element?",
                    options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
                    correct: 1
                },
                {
                    question: "How do you declare a JavaScript variable?",
                    options: ["variable carName", "v carName", "var carName", "declare carName"],
                    correct: 2
                },
                {
                    question: "Which operator is used to assign a value to a variable?",
                    options: ["*", "=", "x", "-"],
                    correct: 1
                },
                {
                    question: "What will the following code return: Boolean(10 > 9)?",
                    options: ["true", "false", "NaN", "undefined"],
                    correct: 0
                },
                {
                    question: "How can you add a comment in JavaScript?",
                    options: ["'This is a comment", "//This is a comment", "<!--This is a comment-->", "*This is a comment*"],
                    correct: 1
                },
                {
                    question: "Which method can be used to find the length of a string?",
                    options: ["length()", "size()", "length", "getSize()"],
                    correct: 2
                },
                {
                    question: "What is the correct way to write a JavaScript function?",
                    options: ["function = myFunction() {}", "function myFunction() {}", "create myFunction() {}", "def myFunction() {}"],
                    correct: 1
                }
            ]
        },
        {
            id: 'react',
            title: 'React',
            description: 'Test your skills in building interactive UIs with React',
            image: 'assets/images/react.jpg',
            questions: [
                {
                    question: "What is React?",
                    options: ["A database", "A JavaScript library for building user interfaces", "A web server", "A CSS framework"],
                    correct: 1
                },
                {
                    question: "Which method is used to create components in React?",
                    options: ["React.createComponent()", "createComponent()", "React.createElement()", "component()"],
                    correct: 2
                },
                {
                    question: "What is JSX?",
                    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
                    correct: 0
                },
                {
                    question: "Which hook is used to manage state in functional components?",
                    options: ["useEffect", "useState", "useContext", "useReducer"],
                    correct: 1
                },
                {
                    question: "What is the virtual DOM?",
                    options: ["A copy of the real DOM kept in memory", "A new version of HTML", "A JavaScript library", "A CSS framework"],
                    correct: 0
                },
                {
                    question: "How do you pass data from parent to child component?",
                    options: ["Using state", "Using props", "Using context", "Using refs"],
                    correct: 1
                },
                {
                    question: "Which lifecycle method is called after a component is rendered?",
                    options: ["componentWillMount", "componentDidMount", "componentWillUpdate", "componentDidUpdate"],
                    correct: 1
                },
                {
                    question: "What is the purpose of useEffect hook?",
                    options: ["To manage state", "To handle side effects", "To create components", "To handle events"],
                    correct: 1
                },
                {
                    question: "How do you handle events in React?",
                    options: ["Using inline event handlers", "Using SyntheticEvents", "Using addEventListener", "All of the above"],
                    correct: 1
                },
                {
                    question: "What is the correct way to update state in React?",
                    options: ["this.state = newState", "this.setState(newState)", "state = newState", "updateState(newState)"],
                    correct: 1
                }
            ]
        },
        {
            id: 'nodejs',
            title: 'Node.js',
            description: 'Test your backend development knowledge with Node.js',
            image: 'assets/images/nodejs.png',
            questions: [
                {
                    question: "What is Node.js?",
                    options: ["A web browser", "A JavaScript runtime built on Chrome's V8 engine", "A database", "A CSS framework"],
                    correct: 1
                },
                {
                    question: "Which command is used to install packages in Node.js?",
                    options: ["npm install", "node install", "install npm", "get package"],
                    correct: 0
                },
                {
                    question: "What is NPM?",
                    options: ["Node Package Manager", "New Programming Method", "Network Protocol Manager", "Node Process Manager"],
                    correct: 0
                },
                {
                    question: "Which module is used to create a web server in Node.js?",
                    options: ["fs", "http", "url", "path"],
                    correct: 1
                },
                {
                    question: "What is the purpose of package.json?",
                    options: ["To store application data", "To manage project dependencies and metadata", "To configure the database", "To store user preferences"],
                    correct: 1
                },
                {
                    question: "Which method is used to read files in Node.js?",
                    options: ["fs.readFile()", "file.read()", "read.file()", "fs.read()"],
                    correct: 0
                },
                {
                    question: "What is Express.js?",
                    options: ["A database", "A web application framework for Node.js", "A templating engine", "A CSS preprocessor"],
                    correct: 1
                },
                {
                    question: "Which command starts a Node.js application?",
                    options: ["start app.js", "run app.js", "node app.js", "execute app.js"],
                    correct: 2
                },
                {
                    question: "What is middleware in Express.js?",
                    options: ["Functions that execute during the request-response cycle", "Database connections", "HTML templates", "CSS files"],
                    correct: 0
                },
                {
                    question: "Which method is used to handle GET requests in Express?",
                    options: ["app.get()", "app.request()", "app.receive()", "app.handle()"],
                    correct: 0
                }
            ]
        }
    ],

    getQuiz(id) {
        return this.quizzes.find(quiz => quiz.id === id);
    },

    getAllQuizzes() {
        return this.quizzes;
    }
};

// Quiz Manager for handling quiz state and logic
const QuizManager = {
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: 600, // 10 minutes in seconds
    timer: null,
    startTime: null,

    startQuiz(quizId) {
        this.currentQuiz = QuizData.getQuiz(quizId);
        
        if (!this.currentQuiz) {
            console.error('Quiz not found:', quizId);
            alert('Quiz not found!');
            return;
        }
        
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.currentQuiz.questions.length).fill(null);
        this.timeRemaining = 600; // 10 minutes
        this.startTime = Date.now();
        this.startTimer();
        localStorage.setItem('currentQuizState', JSON.stringify({
            quizId,
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            timeRemaining: this.timeRemaining,
            startTime: this.startTime
        }));
    },

    loadQuizState() {
        const saved = localStorage.getItem('currentQuizState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentQuiz = QuizData.getQuiz(state.quizId);
            this.currentQuestionIndex = state.currentQuestionIndex;
            this.answers = state.answers;
            this.timeRemaining = state.timeRemaining;
            this.startTime = state.startTime;
            
            // Adjust time based on actual elapsed time
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.timeRemaining = Math.max(0, 600 - elapsed);
            
            if (this.timeRemaining > 0) {
                this.startTimer();
                return true;
            } else {
                this.submitQuiz();
                return false;
            }
        }
        return false;
    },

    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            // Save state every 10 seconds
            if (this.timeRemaining % 10 === 0) {
                this.saveQuizState();
            }
            
            if (this.timeRemaining <= 0) {
                this.submitQuiz();
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const hours = Math.floor(this.timeRemaining / 3600);
        const minutes = Math.floor((this.timeRemaining % 3600) / 60);
        const seconds = this.timeRemaining % 60;

        const hoursEl = document.querySelector('.timer-hours');
        const minutesEl = document.querySelector('.timer-minutes');
        const secondsEl = document.querySelector('.timer-seconds');

        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    },

    saveQuizState() {
        if (this.currentQuiz) {
            localStorage.setItem('currentQuizState', JSON.stringify({
                quizId: this.currentQuiz.id,
                currentQuestionIndex: this.currentQuestionIndex,
                answers: this.answers,
                timeRemaining: this.timeRemaining,
                startTime: this.startTime
            }));
        }
    },

    selectAnswer(answerIndex) {
        this.answers[this.currentQuestionIndex] = answerIndex;
        this.saveQuizState();
    },

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.saveQuizState();
            return true;
        }
        return false;
    },

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.saveQuizState();
            return true;
        }
        return false;
    },

    calculateScore() {
        let correct = 0;
        this.answers.forEach((answer, index) => {
            if (answer === this.currentQuiz.questions[index].correct) {
                correct++;
            }
        });
        return {
            correct,
            total: this.currentQuiz.questions.length,
            percentage: Math.round((correct / this.currentQuiz.questions.length) * 100)
        };
    },

    getIncorrectAnswers() {
        const incorrect = [];
        this.answers.forEach((answer, index) => {
            const question = this.currentQuiz.questions[index];
            if (answer !== question.correct) {
                incorrect.push({
                    questionIndex: index + 1,
                    question: question.question,
                    userAnswer: answer !== null ? question.options[answer] : 'Not answered',
                    correctAnswer: question.options[question.correct]
                });
            }
        });
        return incorrect;
    },

    submitQuiz() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        const score = this.calculateScore();
        const incorrectAnswers = this.getIncorrectAnswers();
        
        // Save quiz result
        const currentUser = AuthManager.getCurrentUser();
        if (currentUser) {
            const users = AuthManager.getUsers();
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                if (!users[userIndex].quizzes) {
                    users[userIndex].quizzes = [];
                }
                users[userIndex].quizzes.push({
                    id: this.currentQuiz.id,
                    name: this.currentQuiz.title,
                    score: score.percentage,
                    correct: score.correct,
                    total: score.total,
                    date: new Date().toISOString()
                });
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update current user session
                const updatedUser = users[userIndex];
                delete updatedUser.password;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        }

        // Store results for results page
        localStorage.setItem('lastQuizResult', JSON.stringify({
            quiz: this.currentQuiz.title,
            score,
            incorrectAnswers,
            timeUsed: 600 - this.timeRemaining
        }));

        // Clear quiz state
        localStorage.removeItem('currentQuizState');
        this.currentQuiz = null;
        
        // Navigate to results
        navigateToPage('quiz-results');
    },

    getCurrentQuestion() {
        if (this.currentQuiz && this.currentQuestionIndex < this.currentQuiz.questions.length) {
            return this.currentQuiz.questions[this.currentQuestionIndex];
        }
        return null;
    },

    getProgress() {
        if (this.currentQuiz) {
            return {
                current: this.currentQuestionIndex + 1,
                total: this.currentQuiz.questions.length,
                percentage: Math.round(((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100)
            };
        }
        return { current: 0, total: 0, percentage: 0 };
    }
};

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
    currentFilter: 'all', // Add filter state
    
    navigate(page) {
        this.currentPage = page;
        // Reset filter when navigating to quiz-selection
        if (page === 'quiz-selection') {
            this.currentFilter = 'all';
        }
        this.render();
    },

    setFilter(filter) {
        this.currentFilter = filter.toLowerCase();
        this.render();
    },

    render() {
        root.innerHTML = "";
        
        // Check authentication for protected routes
        if (AuthManager.isAuthenticated()) {
            // Check if there's an ongoing quiz and restore it
            if (this.currentPage === 'quiz' && !QuizManager.currentQuiz) {
                if (!QuizManager.loadQuizState()) {
                    // No valid quiz state, redirect to quiz selection
                    this.currentPage = 'quiz-selection';
                }
            }

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

        // Quiz-specific event listeners
        this.addQuizEventListeners();
    },

    addQuizEventListeners() {
        // Update timer display if on quiz page
        if (this.currentPage === 'quiz' && QuizManager.currentQuiz) {
            QuizManager.updateTimerDisplay();
        }
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
            logoutBtn.className = 'text-red-600 hover:text-red-700 font-medium cursor-pointer';
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

// Global filter function
function setQuizFilter(filter) {
    Router.setFilter(filter);
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Global quiz functions
function startQuiz(quizId) {
    QuizManager.startQuiz(quizId);
    navigateToPage('quiz');
}

function selectQuizAnswer(answerIndex) {
    QuizManager.selectAnswer(answerIndex);
}

function nextQuizQuestion() {
    if (QuizManager.nextQuestion()) {
        Router.render(); // Re-render to show next question
    }
}

function previousQuizQuestion() {
    if (QuizManager.previousQuestion()) {
        Router.render(); // Re-render to show previous question
    }
}

function submitCurrentQuiz() {
    if (confirm('Are you sure you want to submit the quiz? This action cannot be undone.')) {
        QuizManager.submitQuiz();
    }
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
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 hover:scale-105 transition-transform cursor-pointer">
                        <img src="assets/svgs/clock.svg" alt="General Knowledge" class="h-[18px] mb-4">
                        <h3 class="font-semibold text-lg mb-2">General Knowledge</h3>
                        <p class="text-[#61738A] text-sm">Test your overall knowledge with fun and challenging
                            questions.</p>
                    </div>
                    <!-- Card 2 -->
                    <div
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 items-center hover:scale-105 transition-transform cursor-pointer">
                        <img src="assets/svgs/trophy.svg" alt="Science & Tech" class="h-[18px] mb-4">
                        <h3 class="font-semibold text-lg mb-2">Science & Tech</h3>
                        <p class="text-[#61738A] text-sm">Explore quizzes on science, technology, and innovation.
                        </p>
                    </div>
                    <!-- Card 3 -->
                    <div
                        class="bg-white rounded-xl border-1 border-[#DBE0E5] py-6 px-4 items-center hover:scale-105 transition-transform cursor-pointer">
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
    const userResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // Get user's quiz history
    const userQuizHistory = userResults.filter(result => result.userId === (currentUser ? currentUser.email : 'demo@quiz.com'));
    
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container 1536px-->
    <div class=\"max-w-screen-2xl mx-auto\">
        <nav class=\"flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3\">
            <a href=\"index.html\"><img src=\"assets/svgs/logo.svg\" alt=\"Logo\"></a>
            <div class=\"flex items-center gap-6\">
                <ul class=\"hidden md:flex gap-6 items-center\">
                    <li><button onclick=\"navigateToPage('home')\" class=\"hover:text-blue-600 cursor-pointer\">Home</button></li>
                    <li><button onclick=\"navigateToPage('quiz-selection')\" class=\"hover:text-blue-600 cursor-pointer\">Quizzes</button></li>
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
        <!-- Image Section -->
        <section>
            <div class=\"my-6 space-y-[2px] flex flex-col items-center\">
                <img src=\"assets/images/default-profile-pic.jpg\" class=\"h-32 w-32\" alt=\"Profile Pic\">
                <p class=\"font-semibold text-lg\">${currentUser ? currentUser.fullName : 'Sophia Bennett'}</p>
                <p class=\"text-[#61738A] text-sm\">Quiz Enthusiast</p>
                <p class=\"text-[#61738A] text-[12px]\">Joined ${currentUser ? new Date(currentUser.joinedDate).getFullYear() : '2021'}</p>
            </div>
        </section>

        <div>
            <div class=\"flex gap-4 px-4 border-b border-b-[#DBE0E5]\">
                <!-- Div to add border bottom -->
                <div class=\"border-b-[3px] border-b-[#E5E8EB]\">
                    <p class=\"py-1\">Activity</p>
                </div>

                <!-- Div to add border bottom -->
                <div class=\"border-b-[3px] border-b-[#E5E8EB]\">
                    <p class=\"py-1\">Profile</p>
                </div>
            </div>

            <div class=\"mx-4\">
                <h2 class=\"text-lg md:text-[22px] font-semibold py-6 border-b border-b-[#DBE0E5]\">Personal Information</h2>

                <div class=\"py-6 grid md:grid-cols-[170px_170px] gap-y-6 text-sm\">
                    <div class=\"space-y-[2px]\">
                        <h3 class=\"text-[#61738A]\">Name</h3>
                        <p class=\"text-[#121417]\">${currentUser ? currentUser.fullName : 'Sophia Bennett'}</p>
                    </div>

                    <div class=\"space-y-[2px]\">
                        <h3 class=\"text-[#61738A]\">Email</h3>
                        <p class=\"text-[#121417]\">${currentUser ? currentUser.email : 'sophia.bennett@email.com'}</p>
                    </div>

                    <div class=\"space-y-[2px] md:py-2 md:border-t md:border-t-[#DBE0E5]\">
                        <h3 class=\"text-[#61738A]\">Bio</h3>
                        <p class=\"text-[#121417]\">Avid quiz taker and trivia lover. Always up for a challenge!</p>
                    </div>
                </div>

                <h2 class=\"text-lg md:text-[22px] font-semibold py-6\">Quiz History</h2>

                <!-- Quiz history table -->
                <div class=\"md:mx-3 my-2 border-1 border-[#DBE0E5] rounded-lg text-[13px]\">
                    <!-- Header div -->
                    <div class=\"px-1 md:px-4 py-[14px] font-medium grid grid-cols-3 items-center border-1 border-[#DBE0E5] text-sm\">
                        <h3>Quiz Name</h3>
                        <h3>Quiz Score</h3>
                        <h3>Date</h3>
                    </div>

                    ${userQuizHistory.length > 0 ? userQuizHistory.map(result => `
                        <div class=\"px-1 md:px-4 py-[14px] grid grid-cols-3 items-center border-1 border-[#DBE0E5]\">
                            <p>${result.quiz}</p>
                            <p class=\"text-[#61738A]\">${result.score.correct}/${result.score.total}</p>
                            <p class=\"text-[#61738A]\">${new Date(result.date).toLocaleDateString()}</p>
                        </div>
                    `).join('') : `
                        <div class=\"px-1 md:px-4 py-[14px] grid grid-cols-3 items-center border-1 border-[#DBE0E5]\">
                            <p>No quiz history available</p>
                            <p class=\"text-[#61738A]\">-</p>
                            <p class=\"text-[#61738A]\">-</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    </div>`;
    return section;
}

function renderQuizResultsPage() {
    const result = JSON.parse(localStorage.getItem('lastQuizResult') || '{}');
    const currentUser = AuthManager.getCurrentUser();
    
    if (!result.score) {
        navigateToPage('quiz-selection');
        return document.createElement('div');
    }

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
            <h1 class=\"text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center\">${result.quiz} Quiz Results</h1>
            <div class=\"w-full max-w-4xl\">
                <div class=\"flex justify-between items-center mb-2\">
                    <span class=\"text-base font-medium text-gray-700\">Quiz Completed</span>
                    <span class=\"text-base font-medium text-gray-700\">100%</span>
                </div>
                <div class=\"relative bg-gray-300 h-2 rounded-full mb-8\">
                    <div class=\"absolute top-0 left-0 bg-black h-2 rounded-full w-full\"></div>
                </div>
                
                <!-- Score Display -->
                <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8\">
                    <div class=\"bg-[#F0F2F5] rounded-lg p-6 text-center\">
                        <div class=\"text-base text-gray-700 mb-2\">Score</div>
                        <div class=\"text-2xl font-bold text-gray-900\">${result.score.correct}/${result.score.total}</div>
                    </div>
                    <div class=\"bg-[#F0F2F5] rounded-lg p-6 text-center\">
                        <div class=\"text-base text-gray-700 mb-2\">Percentage</div>
                        <div class=\"text-2xl font-bold ${result.score.percentage >= 70 ? 'text-green-600' : result.score.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}\">${result.score.percentage}%</div>
                    </div>
                    <div class=\"bg-[#F0F2F5] rounded-lg p-6 text-center\">
                        <div class=\"text-base text-gray-700 mb-2\">Time Used</div>
                        <div class=\"text-2xl font-bold text-gray-900\">${Math.floor(result.timeUsed / 60)}:${(result.timeUsed % 60).toString().padStart(2, '0')}</div>
                    </div>
                </div>

                <div class=\"text-center mb-8 md:w-[90%] md:mx-auto\">
                    <p class=\"text-[#121417]\">
                        ${result.score.percentage >= 80 
                            ? `Excellent work, ${currentUser ? currentUser.fullName : 'there'}! You've mastered this topic with a score of ${result.score.correct} out of ${result.score.total}. Your performance indicates exceptional understanding of ${result.quiz}.`
                            : result.score.percentage >= 60
                            ? `Good job, ${currentUser ? currentUser.fullName : 'there'}! You've completed the quiz with a score of ${result.score.correct} out of ${result.score.total}. You have a solid understanding of ${result.quiz}, but there's room for improvement.`
                            : `Keep practicing, ${currentUser ? currentUser.fullName : 'there'}! You scored ${result.score.correct} out of ${result.score.total}. Don't worry - every expert was once a beginner. Review the material and try again!`
                        }
                    </p>
                </div>
                <div class=\"flex flex-col items-center gap-4\">
                    ${result.incorrectAnswers.length > 0 ? 
                        '<button onclick=\"navigateToPage(\'review-answers\')\" class=\"px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium\">Review Incorrect Answers</button>' 
                        : '<div class=\"text-green-600 font-medium text-lg\">Perfect Score! No incorrect answers to review.</div>'}
                    <button onclick=\"navigateToPage('quiz-selection')\" class=\"px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium\">Back to Quizzes</button>
                </div>
            </div>
        </section>
    </div>`;
    return section;
}

function renderQuizSelectionPage() {
    const quizzes = QuizData.getAllQuizzes();
    const currentFilter = Router.currentFilter;
    
    // Filter quizzes based on current filter
    const filteredQuizzes = currentFilter === 'all' 
        ? quizzes 
        : quizzes.filter(quiz => quiz.id === currentFilter);
    
    // Determine section heading based on filter
    const sectionHeading = currentFilter === 'all' 
        ? 'All Quizzes' 
        : `${quizzes.find(q => q.id === currentFilter)?.title || currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Quizzes`;
    
    const section = document.createElement("section");
    section.innerHTML = `<!-- Container -->
    <div class="max-w-screen-2xl mx-auto">
        <nav class="flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3">

            <div class="flex items-center gap-2 md:gap-4">
                <a href="index.html"><img src="assets/svgs/logo.svg" class="h-5" alt="Logo"></a>
                <ul class="hidden md:flex gap-6 items-center">
                    <li><button onclick="navigateToPage('dashboard')" class="hover:text-blue-600 cursor-pointer">Dashboard</button></li>
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
                <li class="${currentFilter === 'all' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('all')">
                    <span>All</span>
                </li>
                <li class="${currentFilter === 'html' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('html')">
                    <span>HTML</span>
                </li>
                <li class="${currentFilter === 'css' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('css')">
                    <span>CSS</span>
                </li>
                <li class="${currentFilter === 'javascript' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('javascript')">
                    <span>JavaScript</span>
                </li>
                <li class="${currentFilter === 'react' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('react')">
                    <span>React</span>
                </li>
                <li class="${currentFilter === 'nodejs' ? 'bg-blue-200 border-blue-400' : 'bg-[#F0F2F5]'} py-1 px-3 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors border" onclick="setQuizFilter('nodejs')">
                    <span>Node.js</span>
                </li>
            </ul>
        </div>

        <!-- Featured Quizzes Section -->
        <section class="my-12 w-full max-w-screen-lg">

            <h2 class="text-xl sm:text-2xl mb-4 sm:mb-6">Featured Quizzes</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                ${quizzes.slice(0, 3).map(quiz => `
                <div class="flex flex-col p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="startQuiz('${quiz.id}')">
                    <div class="self-center grow flex justify-center items-center">
                        <img src="${quiz.image}" alt="${quiz.title} Quiz" class="max-w-full max-h-[200px] object-cover object-center">
                    </div>
                    <div class="p-3 sm:p-4 mt-auto">
                        <h3 class="font-bold text-base sm:text-lg mb-1 sm:mb-2">${quiz.title}</h3>
                        <p class="text-gray-600 text-xs sm:text-sm">${quiz.description}</p>
                        <p class="text-blue-600 text-xs mt-1">10 questions • 10 minutes</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- All Quizzes Section -->
        <section class="my-12">
            <h2 class="text-xl sm:text-2xl mb-4 sm:mb-6">${sectionHeading}</h2>

            <div>
                ${filteredQuizzes.length > 0 ? filteredQuizzes.map(quiz => `
                <article class="mx-auto flex flex-col gap-2 justify-between items-center w-fit p-4 sm:flex-row sm:w-auto shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="startQuiz('${quiz.id}')">
                    <!-- Text Section -->
                    <div class="px-2 py-4">
                        <h3 class="font-medium text-lg mb-2">${quiz.title}</h3>
                        <p class="text-[#61738A]">${quiz.description}</p>
                        <p class="text-blue-600 text-sm mt-1">10 questions • 10 minutes</p>
                    </div>

                    <!-- Image Section -->
                    <div class="flex sm:justify-end">
                        <img src="${quiz.image}" class="max-h-[170px]" alt="${quiz.title} Logo">
                    </div>
                </article>
                `).join('') : `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">No quizzes found for the selected category.</p>
                </div>
                `}
            </div>
        </section>

    </div>`;
    return section;
}

function renderQuizPage() {
    const currentQuestion = QuizManager.getCurrentQuestion();
    const progress = QuizManager.getProgress();
    
    if (!currentQuestion) {
        navigateToPage('quiz-selection');
        return document.createElement('div');
    }

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
            
            <!-- Quiz Title -->
            <div class="text-center mb-6">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">${QuizManager.currentQuiz.title} Quiz</h1>
            </div>

            <!-- Progress Section -->
            <div class="space-y-3 mb-8">
                <h3 class="text-lg font-medium text-gray-700">Progress</h3>
                <div class="relative bg-[#DBE0E5] h-2 rounded-full">
                    <div class="absolute top-0 left-0 bg-black h-2 rounded-full" style="width: ${progress.percentage}%"></div>
                </div>
                <p class="text-sm text-gray-600">Question ${progress.current} of ${progress.total}</p>
            </div>

            <!-- Timer Section -->
            <div class="grid grid-cols-3 gap-2 md:gap-6 mb-8">
                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800 timer-hours">00</div>
                    <div class="text-sm text-[#121417]">Hours</div>
                </div>
                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800 timer-minutes">10</div>
                    <div class="text-sm text-[#121417]">Minutes</div>
                </div>
                <div class="text-center min-w-[80px] space-y-2">
                    <div class="bg-gray-100 rounded-lg px-4 py-2 text-2xl font-bold text-gray-800 timer-seconds">00</div>
                    <div class="text-sm text-[#121417]">Seconds</div>
                </div>
            </div>

            <!-- Question Section -->
            <div class="bg-white rounded-lg p-6 mb-8">
                
                <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                    ${escapeHtml(currentQuestion.question)}
                </h2>

                <!-- Answer Options -->
                <div class="space-y-4">
                    ${currentQuestion.options.map((option, index) => `
                    <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${QuizManager.answers[QuizManager.currentQuestionIndex] === index ? 'bg-blue-50 border-blue-300' : ''}">
                        <input type="radio" name="answer" value="${index}" class="mr-4 w-5 h-5 text-black" 
                               ${QuizManager.answers[QuizManager.currentQuestionIndex] === index ? 'checked' : ''}
                               onchange="selectQuizAnswer(${index})">
                        <span class="text-gray-700">${escapeHtml(option)}</span>
                    </label>
                    `).join('')}
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    <button onclick="navigateToPage('quiz-selection')" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium cursor-pointer">
                        Exit Quiz
                    </button>
                    ${QuizManager.currentQuestionIndex > 0 ? 
                        '<button onclick="previousQuizQuestion()" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium cursor-pointer">Previous</button>' : 
                        ''}
                </div>
                <div class="flex gap-4">
                    ${QuizManager.currentQuestionIndex < QuizManager.currentQuiz.questions.length - 1 ? 
                        '<button onclick="nextQuizQuestion()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">Next</button>' : 
                        '<button onclick="submitCurrentQuiz()" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer">Finish Quiz</button>'}
                </div>
            </div>

        </div>

    </div>`;
    return section;
}

function renderReviewIncorrectAnswersPage() {
    const result = JSON.parse(localStorage.getItem('lastQuizResult') || '{}');
    
    if (!result.incorrectAnswers) {
        navigateToPage('quiz-selection');
        return document.createElement('div');
    }

    const section = document.createElement("section");
    section.className = "font-primary";
    section.innerHTML = `<!-- Container -->
    <div class="max-w-screen-2xl mx-auto">
        <!-- NavBar -->
        <nav class="flex justify-between items-center border-b-[1px] border-[#61738A] px-4 md:px-6 py-3">
            <a href="index.html"><img src="assets/svgs/logo.svg" alt="Logo"></a>
            <div class="flex items-center gap-6">
                <ul class="hidden md:flex gap-6 items-center">
                    <li><button onclick="navigateToPage('home')" class="hover:text-blue-600 cursor-pointer">Home</button></li>
                    <li><button onclick="navigateToPage('quiz-selection')" class="hover:text-blue-600 cursor-pointer">Quizzes</button></li>
                    <li><a href="#">LeaderBoard</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
                <img src="assets/svgs/hamburger-menu.svg" class="h-6 md:hidden" alt="Open Sidebar">
                <div class="bg-[#F0F2F5] rounded-md p-[6px]"><img src="assets/svgs/bell-icon.svg" alt="Notificaions"></div>
                <div><img src="assets/images/profile-pic-small.png" class="h-8" alt="Profile pic"></div>
            </div>
        </nav>
    </div>

    <div class="max-w-screen-lg mx-auto px-4">
        <section class="py-12">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Review Incorrect Answers</h1>
            
            <div id="incorrect-answers-list" class="space-y-8">
                ${result.incorrectAnswers.length === 0 ? 
                    `<div class="text-center py-12">
                        <div class="text-green-600 text-xl font-semibold mb-4">Perfect Score!</div>
                        <p class="text-gray-600">You answered all questions correctly. Great job!</p>
                    </div>` :
                    result.incorrectAnswers.map(item => `
                    <div class="space-y-2">
                        <h2 class="text-lg font-semibold text-gray-800">Question ${item.questionIndex}</h2>
                        <p class="text-base text-gray-700">${escapeHtml(item.question)}</p>
                        <p class="text-base text-gray-700"><span class="font-medium">Your answer:</span> ${escapeHtml(item.userAnswer)}</p>
                        <p class="text-base text-gray-700"><span class="font-medium">Correct answer:</span> ${escapeHtml(item.correctAnswer)}</p>
                    </div>
                    `).join('')
                }
            </div>
            
            <div class="flex justify-end mt-12">
                <button onclick="navigateToPage('quiz-selection')" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">Back to Quizzes</button>
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
                <button type=\"submit\" class=\"w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition-colors cursor-pointer\">Sign In</button>
            </form>
            <div class=\"text-center mt-6\">
                <p class=\"text-gray-600\">Don't have an account? 
                    <button onclick=\"navigateToPage('signup')\" class=\"text-blue-600 hover:text-blue-700 font-medium cursor-pointer\">Sign up here</button>
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
                <button type=\"submit\" class=\"w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition-colors cursor-pointer\">Sign Up</button>
            </form>
            <div class=\"text-center mt-6\">
                <p class=\"text-gray-600\">Already have an account? 
                    <button onclick=\"navigateToPage('signin')\" class=\"text-blue-600 hover:text-blue-700 font-medium cursor-pointer\">Sign in here</button>
                </p>
            </div>
        </div>
    </div>`;
    return section;
}


document.addEventListener("DOMContentLoaded", () => {
    // Initialize demo data
    AuthManager.initializeDemoData();
    
    // Check for ongoing quiz and restore if valid
    if (AuthManager.isAuthenticated()) {
        const savedQuizState = localStorage.getItem('currentQuizState');
        if (savedQuizState) {
            if (QuizManager.loadQuizState()) {
                Router.currentPage = 'quiz';
            }
        }
    }
    
    // Initialize the router
    Router.render();
});

