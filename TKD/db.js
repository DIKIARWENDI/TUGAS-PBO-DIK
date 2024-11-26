const mysql = require('mysql');

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',        // Ganti sesuai konfigurasi database
    user: 'root',             // Ganti dengan username database Anda
    password: '',             // Ganti dengan password database Anda
    database: 'pertemuan5'  // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected');
    }
});

module.exports = db;
