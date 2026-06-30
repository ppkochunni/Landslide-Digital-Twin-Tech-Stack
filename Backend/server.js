const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Using MySQL instead of pg
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
app.use(cors());
app.use(express.json());

// 1. Signup Route
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // MySQL uses '?' instead of '$1'
        const [userCheck] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (userCheck.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Insert new user into MySQL
        await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );

        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully!"
        });
    } catch (err) {
        console.error("Database Error during Signup:", err.message);
        return res.status(500).json({ success: false, message: "Server database error" });
    }
});

// 2. Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const user = users[0];

        // Check if the input password matches
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Welcome back!",
            user: { username: user.username, email: user.email }
        });
    } catch (err) {
        console.error("Database Error during Login:", err.message);
        return res.status(500).json({ success: false, message: "Server database error" });
    }
});

// 3. Fetch Soil Properties Route
app.get('/api/soil-properties', async (req, res) => {
    try {
        // Fetching all rows from the soil_properties table
        const [rows] = await pool.execute('SELECT * FROM soil_properties');
        
        return res.status(200).json({ 
            success: true, 
            data: rows 
        });
    } catch (err) {
        console.error("Database Error fetching soil properties:", err.message);
        return res.status(500).json({ success: false, message: "Server database error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});