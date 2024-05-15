const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_node_mysql'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

app.get('/api/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/api/posts', (req, res) => {
  const post = req.body;
  db.query('INSERT INTO posts SET ?', post, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
