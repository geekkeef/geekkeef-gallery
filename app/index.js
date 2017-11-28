var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Gallery         = require('./models/gallery'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds');

var app = express();

mongoose.connect('mongodb://localhost/geek-gallery', { useMongoClient: true });
mongoose.Promise = global.Promise;
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Passport Config
app.use(require('express-session')({
    secret: 'Goonies never say die!!!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============================================================//

/* Routes 
===============================================================*/

app.get('/', function(req,res){
    res.render('landing');
});

app.get("/home", function (req, res) {
    var div = '<div id="modal--reg" class="modal modal--reg"></div>'
    res.render('home', { title: 'GEEK', regModal: div });
});

app.get("/social", function (req, res) {
    res.render('social');
});

app.get('/gallery', function(req,res){
    Gallery.find({}, function(err,allPhotos){
        if (err || !allPhotos) {
            console.log(err);
        } else {
            res.render('gallery/gallery', { photos: allPhotos });
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
            console.log(err);
        }else{
            res.redirect('/gallery');
        }
    }); 
});

app.get('/gallery/new', function(req,res){
    res.render('gallery/new');
});

app.get('/gallery/:id', function(req,res){
    Gallery.findById(req.params.id).populate('comments').exec(function(err, foundPhoto){
        if(err || !foundPhoto || !req.params.id){
            console.log(err);
        }else{
            res.render('gallery/show', {photo:foundPhoto});
        }
    });
});

/* Comment Routes 
===============================================================*/

app.get('/gallery/:id/comments/new', function(req,res){
    Gallery.findById(req.params.id, function(err, foundPhoto){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {photo:foundPhoto});
        }
    });
});

app.post('/gallery/:id/comments', function(req,res){
    Gallery.findById(req.params.id, function (err, foundPhoto){
        if (err) {
            console.log(err);
            res.status(500).redirect('/gallery');
        } else {
            Comment.create(req.body.comment, function(err, createdComment){
                if(err){
                    console.log(err);
                }else{
                    foundPhoto.comments.push(createdComment);
                    foundPhoto.save();
                    res.redirect('/gallery/' + foundPhoto._id);
                }
            });
        }
    });
});

/* Auth Routes 
===============================================================*/

app.get('/register', function(req,res){
    res.render('register');
});

app.post('/register', function(req,res){
    var div = '<div id="modal--reg" class="modal modal--reg"></div>'
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('home');
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/');
                res.send({ regModal: div});
            });
        }
    });
});

app.get('/login', function (req, res) {
    res.render('login');
});


/* Listen PORT
===============================================================*/

app.listen(5001, function(){
    console.log('SERVER STARTED');
});