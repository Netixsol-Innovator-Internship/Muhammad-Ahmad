# QuizMaster SPA - Week 2 Day 5

## Task Summary
- Build a comprehensive quiz application as a Single Page Application (SPA) using JavaScript, HTML, and Tailwind CSS.
- Store 5 quizzes, each with 10 questions, in an array.
- Implement quiz logic with a 10-minute timer and auto-submit functionality.
- Add user authentication (sign up, sign in, dashboard).
- Enable review of incorrect answers after quiz submission.
- Implement quiz filtering functionality on the quiz selection page.

## Implementation Details
- **SPA Architecture:** All pages (home, dashboard, quiz selection, quiz, results, review incorrect answers, sign in/up) are rendered dynamically via JavaScript in `src/js/index.js`.
- **Quiz Data:** Five quizzes (HTML, CSS, JavaScript, React, Node.js) are stored in a structured array, each with 10 multiple-choice questions.
- **Timer Logic:** Each quiz has a 10-minute countdown. The quiz auto-submits when time runs out.
- **Authentication:** User registration and login are handled with localStorage. Dashboard displays user info and quiz history.
- **Quiz Review:** After submission, users can review incorrect answers with correct solutions.
- **Filtering:** Quiz selection page supports filtering quizzes by category.
- **Styling:** Tailwind CSS is used for responsive, modern UI. Cursor pointer is added to all interactive elements.
- **Persistence:** Quiz progress, results, and user data are stored in localStorage for session continuity.
- **Project Structure:**
  - `index.html`: Single entry point for SPA
  - `src/js/index.js`: Contains all app logic and rendering
  - `assets/`: Images and SVGs for UI
  - `output.css`: Compiled Tailwind CSS

## Live Preview:
**Preview:** [ahmad-week2-day5-quiz.vercel.app](https://ahmad-week2-day5-quiz.vercel.app/)
