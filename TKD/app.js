const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./auth'); // Rute untuk autentikasi
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk parsing body
app.use(bodyParser.urlencoded({ extended: false }));

// Konfigurasi session
app.use(session({
    secret: 'your_secret_key', // Ganti dengan kunci rahasia yang aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

// Set view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Gunakan rute dari auth.js
app.use('/', authRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
