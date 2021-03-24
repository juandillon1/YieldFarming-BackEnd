var express = require('express');
var app = express();

app.get('/', (req, res) => {
    return res.send('Alive');
});

module.exports = app;