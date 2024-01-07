const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shankar',
  database: 'pro',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create a reusable function for handling database queries
function queryDatabase(query, res) {
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error querying the database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
}

// Route for getting users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  queryDatabase(query, res);
});

// Route for getting user track recommendations
app.get('/user_track_recs', (req, res) => {
  const query = 'SELECT * FROM user_track_recs';
  queryDatabase(query, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
