const express = require('express');
const fs = require('fs');

const app = express();
const port = 9904;

app.get('/service-worker.js', function (req, res) {
    const jsContent = fs.readFileSync('build/service-worker.js', 'utf8');
    res.set('Content-Type', 'application/javascript');
    res.send([jsContent, '/*', new Date().toISOString().substring(11, 16), '*/'].join(''));
});

app.use(express.static('build'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))