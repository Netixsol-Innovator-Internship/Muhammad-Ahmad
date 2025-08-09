# Week 02 - Day 01

## Task Summary
Build a responsive Age Calculator web app. The user enters their date of birth (day, month, year), and the app calculates and displays their age in years, months, and days. The app validates input, handles leap years, and provides user-friendly error messages for invalid or impossible dates.

## Implementation Details
- **HTML**: Structured form for day, month, and year input, with output fields for age results.
- **CSS**: Responsive design using flexbox/grid and media queries for mobile and desktop. Visual feedback for errors and focus states.
- **JavaScript**:
  - Collects and validates user input on blur and submit.
  - Use **Event Delegation** instead of adding event listeners for every element technique for performance considerations.
  - Checks for valid day/month/year combinations, including leap year logic.
  - Calculates age by comparing the input date to the current date, outputting years, months, and days.
  - Displays error messages for empty, out-of-range, or impossible dates.
  - Prevents calculation if any validation fails.

## Live Preview:
**Preview:** [ahmad-week2-day1-calculator.vercel.app](https://ahmad-week2-day1-calculator.vercel.app)