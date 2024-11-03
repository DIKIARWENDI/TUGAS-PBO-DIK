const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./config/db'); // Mengimpor koneksi database

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rute utama
app.get('/', (req, res) => {
    res.render('index');
});

// Rute login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, results) => {
        if (err) {
            return res.send('Error during login');
        }
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (isMatch) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/dashboard');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
            });
        } else {
            res.send('Incorrect Username and/or Password!');
        }
    });
});

// Rute register
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.send('Error during registration');
        db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
            if (err) {
                return res.send('Error during registration');
            }
            res.redirect('/login');
        });
    });
});

// Rute dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        const dashboardData = {};

        db.query('SELECT COUNT(*) AS count FROM users', (err, results) => {
            if (err) throw err;
            dashboardData.usersCount = results[0].count;

            db.query('SELECT COUNT(*) AS count FROM siswa', (err, results) => {
                if (err) throw err;
                dashboardData.siswaCount = results[0].count;

                db.query('SELECT COUNT(*) AS count FROM sabeum', (err, results) => {
                    if (err) throw err;
                    dashboardData.sabeumCount = results[0].count;

                    db.query('SELECT COUNT(*) AS count FROM jadwal', (err, results) => {
                        if (err) throw err;
                        dashboardData.jadwalCount = results[0].count;

                        db.query('SELECT COUNT(*) AS count FROM kejuaraan', (err, results) => {
                            if (err) throw err;
                            dashboardData.kejuaraanCount = results[0].count;

                            res.render('dashboard', { data: dashboardData, username: req.session.username });
                        });
                    });
                });
            });
        });
    } else {
        res.redirect('/login');
    }
});

// Rute tambahan untuk keperluan CRUD pada data Sabeum
app.get('/sabeum', (req, res) => {
    db.query(`SELECT * FROM sabeum`, (err, rows) => {
        if (err) throw err;
        res.render('sabeum', { sabeum: rows });
    });
});

app.post('/sabeum/add', (req, res) => {
    const { name, experience } = req.body;
    db.query(`INSERT INTO sabeum (name, experience) VALUES (?, ?)`, [name, experience], (err) => {
        if (err) throw err;
        res.redirect('/sabeum');
    });
});

// Server berjalan pada PORT 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
