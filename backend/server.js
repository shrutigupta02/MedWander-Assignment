const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@2024',
    database: 'user-login',
});

db.connect((err) => {
    if(err){
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/user', (req, res)=>{
    const query = 'INSERT INTO user-data (`id`, `name`, `country-code`, `phone-number`) values (?)';
    const values = [
        uuidv4(),
        req.body.name,
        req.body.countryCode,
        req.body.phoneNumber
    ];

    db.query(query, (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send({error : 'Database query error'});
            return;
        }

        console.log(result);
        res.status(200).send({ message: 'User registered successfully' });
    })
})

app.listen(1234, ()=>{
    console.log('Listening on port 1234');
}) 