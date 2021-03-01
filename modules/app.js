require('dotenv').config();
const express = require('express');
const app = express();
const PORT =  3003

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/dashboard', (req, res) => {
    res.json({
        msg: 'Good',
        status: 200
    });
});

app.listen(PORT, () => {
    console.log("Okay")
})