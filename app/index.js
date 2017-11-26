var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('landing');
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.get('/photos', function(req,res){
    var photos = [
        { name: "Storm Trooper", image: "http://geekkeef.com/assets/pix/ciprian-boiciuc-193062.jpg", description: "These aren't the droids you're looking for"},
        { name: "PS Controller", image: "http://geekkeef.com/assets/pix/ugur-akdemir-238673.jpg", description: "Up, Down, Left, Right, B, A, START" },
        { name: "Jumpman", image: "http://geekkeef.com/assets/pix/paul-volkmer-451300.jpg", description: "As you wish, Your Airness" }
    ]

    res.render('photos', {galleryPhotos:photos});
});

app.listen(8080, function(){
    console.log('SERVER STARTED');
});