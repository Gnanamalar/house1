const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

dotenv.config();
// Load environment variables
console.log(
  process.env.HOST,
  process.env.USER,
  process.env.PASSWORD,
  process.env.DATABASE
);
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/submit', (req, res) => {
  const { name, email, mobile, city, fromDate, toDate, subject } = req.body;

  const sql = `INSERT INTO contacts (name, email, mobile, city, from_date, to_date, subject)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [name, email, mobile, city, fromDate, toDate, subject],
    (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      } else {
        console.log('Contact details added successfully!');
        res.json({ message: 'Contact details added successfully!' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
