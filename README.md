# Dumichko

A web-based word puzzle game tailored for the Bulgarian language, inspired by Wordle.

## Tech Stack & Backend Pipeline

- **Runtime:** Node.js & Express.js
- **Database:** MySQL (Relational persistence for user accounts, streaks, and match statistics)
- **Security:** Password hashing using `bcrypt`
- **Data Ingestion:** Dictionary parsing and validation via `papaparse` and `validator`
- **Frontend:** Vanilla JavaScript, HTML5, CSS3

## Highlights

- Custom dictionary parsing of 5-letter Bulgarian words from structured CSV data.
- User authentication and score/streak tracking stored in MySQL.
- Full RESTful endpoints for game verification and leaderboard queries.
