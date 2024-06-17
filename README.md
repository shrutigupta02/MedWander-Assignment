# Full Stack Intern Assignment

## Live Demo (Frontend only) : https://fullstack-assignment.netlify.app/
## Excel sheet link : https://docs.google.com/spreadsheets/d/1PZtmojZG-Xr5OGTqOzGTl3wsSGhxDRJtc_1Ay2oFJgM/edit?usp=sharing

This project implements a web application for managing user data and interacting with Google Sheets via a RESTful API. It utilizes React for the front-end, Express.js for the back-end, MySQL for database storage, and Google Sheets API for spreadsheet integration.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shrutigupta02/MedWander-Assignment.git
   ```

2. Install dependencies for both the client and server:

   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../frontend
   npm install
   ```

3. Set up Google Sheets API credentials:

   - Obtain a service account key JSON file from Google Cloud Console.
   - Save the JSON file as `user-data-426712-c76e7ddae8ba.json`.

4. Set up MySQL database:

   - Ensure MySQL is installed and running locally.
   - Create a database named `user-login`.
   - Modify `backend/server.js` with your MySQL connection details (`host`, `user`, `password`).

## How to Run the Application

1. Start the server:

   ```bash
   # From backend/
   npm start
   ```

   This will start the Express server at `http://localhost:1234`.

2. Start the client:

   ```bash
   # From frontend/src/
   npm run dev
   ```

   This will start the React development server and open the application in your default web browser at `http://localhost:5173`.

## Functionality Implemented

The application provides the following features:

- **Form Submission:** Users can submit a form (name, country code, phone number) which is stored in a MySQL database (`userdata` table).
- **Google Sheets Integration:** Upon form submission, data is also written to a specified Google Sheet using the Google Sheets API (`User-Data`).

Link to the excel sheet: https://docs.google.com/spreadsheets/d/1PZtmojZG-Xr5OGTqOzGTl3wsSGhxDRJtc_1Ay2oFJgM/edit?usp=sharing

- **Navigation:** Users can navigate between different forms (`Form A`, `Form B`) from the home page.
- **Data Refresh:** The home page includes a button to refresh data from the MySQL database and update the corresponding Google Sheet.
