var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/geek-gallery', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Schema Setup
var gallerySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Gallery = mongoose.model('Gallery', gallerySchema);

// Gallery.create(
//     {
//         name: "Jumpman",
//         image: "http://geekkeef.com/assets/pix/paul-volkmer-451300.jpg",
//         description: "As you wish, Your Airness"
//     }, function(err,photo){
//         if(err){
//             console.log(err);
//         }else{
//             console.log('NEWLY CREATED GALLERY')
//         }
// });

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

    var newPhoto = {name:name,image:image,description:description};
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

app.listen(8090, function(){
    console.log('SERVER STARTED');
});