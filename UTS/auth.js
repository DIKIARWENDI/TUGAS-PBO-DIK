const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('./db'); // Pastikan ini sesuai dengan koneksi database Anda

// Route: Register - Get form
router.get('/register', (req, res) => res.render('register'));

// Route: Register - Post form
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
        return res.send('Please fill all required fields.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        db.query(
            'INSERT INTO taekwondoin (username, password) VALUES (?, ?)',
            [username, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).send('An error occurred while registering your account.');
                }
                res.redirect('/login');
            }
        );
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).send('Server error');
    }
});

// Route: Login - Get form
router.get('/login', (req, res) => res.render('login'));

// Route: Login - Post form
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM taekwondoin WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.send('Invalid username or password');
        }

        req.session.user = results[0]; // Simpan data user ke session
        res.redirect('/dashboard');
    });
});

// Route: Dashboard - Show dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    // Menampilkan data dashboard
    db.query('SELECT COUNT(*) AS count FROM taekwondoin', (err, userCount) => {
        if (err) {
            console.error("Error fetching user count:", err);
            return res.status(500).send('An error occurred while fetching user data.');
        }

        // Contoh lain untuk mengambil data, seperti siswa, kejuaraan, dll.
        db.query('SELECT COUNT(*) AS count FROM siswa', (err, siswaCount) => {
            if (err) {
                console.error("Error fetching siswa count:", err);
                return res.status(500).send('An error occurred while fetching siswa data.');
            }

            res.render('dashboard', {
                userCount: userCount[0].count,
                siswaCount: siswaCount[0].count,
                username: req.session.user.username,
            });
        });
    });
});

// Route: Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

module.exports = router;
