console.log("🔥 AKHILA FINAL SERVER");
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mern_auth'
});

db.connect(err => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// REGISTER
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) return res.send("Error");
      res.send("User Registered Successfully");
    }
  );
});

// LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) return res.send("User not found");

    const valid = await bcrypt.compare(password, result[0].password);

    if (!valid) return res.send("Wrong password");

    const token = jwt.sign({ id: result[0].id }, "secretkey");

    res.json({ token });
  });
});
// 🔐 VERIFY TOKEN
const verify = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.send("No token");

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.send("Invalid token");

    req.user = decoded.id;
    next();
  });
};

// ➕ CREATE ITEM
app.post('/items', (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO items (user_id, title, description) VALUES (?, ?, ?)",
    [req.user, title, description],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error");
      }
      res.send("Item added");
    }
  );
});

// 📥 GET ITEMS
app.get('/items', (req, res) => {
  db.query(
    "SELECT * FROM items",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error");
      }
      res.json(result);
    }
  );
});

// ❌ DELETE ITEM
app.delete('/items/:id', (req, res) => {
  db.query(
    "DELETE FROM items WHERE id=?",
    [req.params.id],
    () => {
      res.send("Deleted");
    }
  );
});
// TEST
app.get('/', (req, res) => {
  res.send("Server working");
});
app.get('/login-test', (req, res) => {
  res.send("Login route exists");
});
app.listen(7000, () => {
  console.log("Server running on port 7000");
});