const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const requestHandler = (req, res) => {
    let filePath = '.' + req.url;
    
    if (filePath == './') {
        filePath = './public/index.html';
    } else {
        filePath = './public' + req.url + '.html';
    }

    const extname = path.extname(filePath);
    const contentType = 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile('./public/404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
