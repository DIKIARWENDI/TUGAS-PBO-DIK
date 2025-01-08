const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/DB.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/latihanrestapi', (req, res) => { 
    const data = { ...req.body };
    const querySql = 'INSERT INTO latihanrestapi SET ?';

    koneksi.query(querySql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ msg: 'Gagal insert data!', error: err });
        }
        return res.status(200).json({ msg: 'Data berhasil dimasukkan!', data: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`);
});