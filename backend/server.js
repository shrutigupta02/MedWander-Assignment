const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { google } = require('googleapis');
const fs = require('fs');

// Constants
const SHEET_ID = '1PZtmojZG-Xr5OGTqOzGTl3wsSGhxDRJtc_1Ay2oFJgM';
const credentials = JSON.parse(fs.readFileSync('./../../../user-data-426712-c76e7ddae8ba.json'));

// Google Sheets API setup
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth: client });

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@2024',
    database: 'user-login',
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to insert user data into MySQL
app.post('/user', (req, res) => {
    const query = 'INSERT INTO userdata (`id`, `name`, `country-code`, `phone-number`, `form-type`) VALUES (?)';
    const values = [
        uuidv4(),
        req.body.name,
        req.body.countryCode,
        req.body.phoneNumber,
        req.body.formType
    ];

    db.query(query, [values], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
            return;
        }

        console.log(result);
        res.status(200).send({ message: 'User registered successfully' });
    });
});

// Endpoint to fetch data from MySQL and write to Google Sheets
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM userdata';

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
            return;
        }

        // Format MySQL data for Google Sheets
        const rows = result.map(row => [
            row.id,
            row.name,
            row['country-code'],
            row['phone-number'],
            row['form-type']
        ]);

        const spreadsheetId = SHEET_ID;
        const range = 'Sheet1!A1:E'; // Update sheet name and range as per your Google Sheet
        
        // Write data to Google Sheets
        sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: {
                values: rows
            }
        }, (err, response) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Error writing to Google Sheets' });
                return;
            }

            console.log('Data written to Google Sheets:', response.data);
            res.status(200).send({ message: 'Data written to Google Sheets' });
        });
    });
});

// Start the server
app.listen(1234, () => {
    console.log('Listening on port 1234');
});
