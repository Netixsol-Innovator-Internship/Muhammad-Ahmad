# Week 02 - Day 02

## Task Summary
Build a dynamic notification dashboard web app that displays a list of user notifications with profile images, actions, timestamps, and read/unread status. The app visually distinguishes unread notifications and supports different notification types (reactions, follows, messages, comments, group activity).

## Implementation Details
- **HTML**: Structured container for notification cards.
- **CSS/TailwindCSS**: Responsive layout, custom styles for unread/read states, and profile images. Used Tailwind's utility classes and pseudo-element support for notification indicators.
- **JavaScript**:
  - Stores notification data as an array of objects.
  - Dynamically generates notification cards using DOM manipulation.
  - Applies conditional styling for unread notifications and displays extra content (images/messages) when present.
  - Utilizes TailwindCSS for styling and pseudo-elements for the unread indicator dot.

## Live Preview:
**Preview:** [ahmad-week2-day2-notifications.vercel.app](https://ahmad-week2-day2-notifications.vercel.app)
