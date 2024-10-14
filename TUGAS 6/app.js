const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // untuk mengakses file CSS

// Koneksi ke database MySQL
const connection = mysql.createConnection({
    host: 'localhost',  // perbaikan typo dari 'hostr'
    user: 'root',
    password: '',
    database: 'diki'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.stack);
        return;
    }
    console.log("MySQL is connected, ID: " + connection.threadId);
});

// Set view engine EJS
app.set('view engine', 'ejs');

// Routing untuk menampilkan data (READ)
app.get('/', (req, res) => {
    const query = 'SELECT * FROM mahasiswa';
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render('index', { mahasiswa: result });
    });
});

// Routing untuk menampilkan form tambah data (CREATE)
app.get('/add', (req, res) => {
    res.render('add');
});

// Routing untuk menambahkan data mahasiswa ke database (CREATE)
app.post('/add', (req, res) => {
    const { nama, email, no_telp } = req.body;
    const query = 'INSERT INTO mahasiswa (nama, email, no_telp) VALUES (?, ?, ?)';
    connection.query(query, [nama, email, no_telp], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Routing untuk menampilkan form edit data (UPDATE)
app.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM mahasiswa WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('edit', { mahasiswa: result[0] });
    });
});

// Routing untuk mengupdate data mahasiswa di database (UPDATE)
app.post('/edit/:id', (req, res) => {
    const { nama, email, no_telp } = req.body;
    const query = 'UPDATE mahasiswa SET nama = ?, email = ?, no_telp = ? WHERE id = ?';
    connection.query(query, [nama, email, no_telp, req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Routing untuk menghapus data mahasiswa (DELETE)
app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM mahasiswa WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Server berjalan di port 3000
app.listen(3000, () => {
    console.log("Server berjalan di port 3000, buka web melalui http://localhost:3000");
});
