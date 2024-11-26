const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db'); // Pastikan ini merujuk ke db.js
const router = express.Router();

// Konfigurasi session
const app = express();
app.use(session({
    secret: 'your_secret_key', // Ganti dengan kunci rahasia yang aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

// Middleware untuk parsing body
app.use(express.urlencoded({ extended: false }));

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Middleware untuk memastikan autentikasi
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Route untuk halaman landing
router.get('/', (req, res) => res.render('landing'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register POST Handler
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send('Please fill all required fields.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

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

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login POST Handler
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM taekwondoin WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.send('Invalid username or password');
        }

        req.session.user = results[0]; 
        res.redirect('/profile');
    });
});

// Profile Page - Requires Authentication
router.get('/profile', ensureAuthenticated, (req, res) => {
    const { username } = req.session.user;

    db.query('SELECT * FROM taekwondoin WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error("Error fetching profile data:", err);
            return res.status(500).send('An error occurred while fetching profile data.');
        }

        res.render('profile', {
            user: results[0],
        });
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Gunakan router
app.use('/', router);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = router;
