var request = require('request');
var express = require('express');
var {parse} = require('node-html-parser');

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

app.get('/hentai', (req, res)=>{
    var page = getRandomInt(1, 112);
    request(`https://hentai-monster.art/hentai/art-${page}`, (err, result, body) => {
        if(err) throw err
        var root = parse(body);
        var array = new Array();
        var title = "hentai";
        root.querySelector('.gallery-wrapper').childNodes[3].childNodes.forEach(element => {
            // console.log(element.rawTagName)

            if(element.rawTagName == 'li')
            {
                array.push("https://hentai-monster.art" + element.childNodes[0].childNodes[0].toString().split(' ')[1].split('"')[1]);
                title = element.childNodes[0].childNodes[0].toString().replace(/".*?"/).split('"')[1];
            }
        });

        console.log()
        res.send({
            title:title,
            result:array,
            page:page
        })
    })
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}