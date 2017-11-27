var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    Gallery         = require('./models/gallery'),
    seedDB          = require('./seeds');

var app = express();

seedDB();
mongoose.connect('mongodb://localhost/geek-gallery', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('landing');
});

app.get("/home", function (req, res) {
    res.render('home');
});

app.get('/gallery', function(req,res){
    Gallery.find({}, function(err,allPhotos){
        if (err || !allPhotos) {
            res.status(500).send({ error: 'Could not load photo(s)' });
            console.log(err);
        } else {
            res.render('gallery', { photos: allPhotos });
        }
    });
});

app.post('/gallery', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var photographer = req.body.photographer;

    var newPhoto = {name:name,image:image,description:description,photographer:photographer};
    Gallery.create(newPhoto, function(err, newPhoto){
        if(err){
            res.status(500).send({ error: 'Could not add photo' });
            console.log(err);
        }else{
            res.redirect('/gallery');
        }
    }); 
});

app.get('/gallery/new', function(req,res){
    res.render('new');
});

app.get('/gallery/:id', function(req,res){
    Gallery.findById(req.params.id).populate('comments').exec(function(err, foundPhoto){
        if(err || !foundPhoto || !req.params.id){
            res.status(500).send({ error: 'Could not load photo' });
            console.log(err);
        }else{
            console.log(foundPhoto);
            res.render('show', {photo:foundPhoto});
        }
    });
});

app.listen(8020, function(){
    console.log('SERVER STARTED');
});