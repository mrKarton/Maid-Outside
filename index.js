var request = require('request');
var express = require('express');

var app = express();

app.listen(7777);

app.get('/tenor', (req, res) => {
    var query = req.query.find;
    request(`https://g.tenor.com/v1/search?q=${query}&key=16Y8CPCJC9KC&limit=15`, (err, result, body) => {
        var data = JSON.parse(body).results;
        var gif = data[getRandomInt(0, data.length)].media[0].gif.url;
        res.send(gif);
    })
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}