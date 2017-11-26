var express         = require('express'),
    bodyParser      = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var photos = [
    { name: "Storm Trooper", image: "http://geekkeef.com/assets/pix/ciprian-boiciuc-193062.jpg", description: "These aren't the droids you're looking for" },
    { name: "PS Controller", image: "http://geekkeef.com/assets/pix/ugur-akdemir-238673.jpg", description: "Up, Down, Left, Right, B, A, START" },
    { name: "Jumpman", image: "http://geekkeef.com/assets/pix/paul-volkmer-451300.jpg", description: "As you wish, Your Airness" }
]

app.get('/', function(req,res){
    res.render('landing');
});

app.get("/home", function (req, res) {
    res.render('home');
});

app.get('/photos', function(req,res){
    res.render('photos', {galleryPhotos:photos});
});

app.post('/photos', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newPhoto = {name:name,image:image,description:description};
    photos.push(newPhoto);

    res.redirect('/photos');
});

app.get('/photos/new', function(req,res){
    res.render('new');
});

app.listen(8081, function(){
    console.log('SERVER STARTED');
});