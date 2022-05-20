const express = require('express');
const path = require('path');
const termData = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(express.static('public'));


// Three endpoints
/*

1 - /api/notes for Get

2 - /api/notes for Post

3 - /api/notes for Delete

*/


app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, 'public/index.html')))

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html')))

app.get('/api/notes', (req, res) => res.json(termData))

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`)
    console.log(req.body)
    console.log('Raw headers ===>', `${req.rawHeaders}`)

    console.info(`${req.method} request received`)
})

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`))

