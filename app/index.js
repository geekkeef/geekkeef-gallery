var express         = require('express'),
    cookieParser    = require('cookie-parser'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    bcrypt          = require('bcrypt-nodejs'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    Gallery         = require('./models/gallery'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    Msg             = require('./models/message'),
    seedDB          = require('./seeds');
    port            = process.env.PORT || 5050;

var app = express();

mongoose.connect('mongodb://localhost/geek-gallery', { useMongoClient: true });
mongoose.Promise = global.Promise;
// seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cookieParser('Kakarrot'));
app.use(morgan('dev'));

// Passport Config
app.use(require('express-session')({
    cookie: {maxAge: 60000},
    secret: 'Goonies never say die!!!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//login
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        User.findOne({ 'username': username },
            function (err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    return done(null, false,
                        req.flash('login', 'No geek found with that username'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false,
                        req.flash('login', 'Opps! Wrong password'));
                }
                return done(null, user);
            }
        );
    }));

//register
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { 
                console.log('*******************');
                console.log('if err');
                console.log(err.message);
                console.log('*******************');
                return done(null, false, req.flash('register', err.message));
            }
            if (user) {
                console.log('*******************');
                console.log('if user');
                console.log('*******************');
                return done(null, false, 
                    req.flash('register', 'A geek with that username already exists'));
            }else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                console.log('*******************');
                console.log('newUser');
                console.log('*******************'); 
                newUser.save(function (err) {
                    if (err) {
                        console.log('*******************');
                        console.log('save err');
                        console.log('*******************');
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    console.log('*******************');
                    console.log('created newUser');
                    console.log('*******************');
                    return done(null, newUser);
                });
            } 
        });
    }
));

//add new user
// var geekkeef = new User({ username: 'geekkeef', password: 'secret' });
// geekkeef.save();

// Custom Middleware
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.message = req.flash('info');
    next(); // move to next code
});

//============================================================//

/* Routes 
===============================================================*/

app.get('/', function(req,res){
    res.render('landing', { title: 'welcomeTo' });
});

app.get("/home", function (req, res) {
    res.render('home', {title: 'home'});
});

app.get('/gallery', function(req,res){
    Gallery.find({}, function(err,allPhotos){
        if (err || !allPhotos) {
            console.log(err);
        } else {
            res.render('gallery/gallery', { photos: allPhotos, title: 'gallery'});
        }
    });
});

app.post('/gallery', isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var photographer = req.body.photographer;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newPhoto = {name:name, image:image, description:description, photographer:photographer, author:author};
    Gallery.create(newPhoto, function(err, newPhoto){
        if(err){
            console.log(err);
        }else{
            res.redirect('/gallery');
        }
    }); 
});

app.get('/gallery/new', isLoggedIn, function(req,res){
    res.render('gallery/new', { title: 'addPhoto' });
});

app.get('/gallery/:id', function(req,res){
    Gallery.findById(req.params.id).populate('comments').exec(function(err, foundPhoto){
        if(err || !foundPhoto || !req.params.id){
            console.log(err);
        }else{
            photoName = foundPhoto.name.replace(" ","");
            res.render('gallery/show', { photo: foundPhoto, title: 'photo_' + photoName});
        }
    });
});

app.get('/gallery/:id/edit', checkOwnership, function(req,res){
    Gallery.findById(req.params.id, function (err, foundPhoto) {
        photoName = foundPhoto.name.replace(" ", "");
        res.render('gallery/edit', { photo: foundPhoto, title: 'edit_' + photoName });
    });
});

app.put('/gallery/:id', checkOwnership, function(req,res){
    Gallery.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err){
            console.log(err);
            res.redirect('/home');
        }else{
            res.redirect('/gallery/' + req.params.id)
        }
    });
});

app.delete('/gallery/:id', checkOwnership, function (req, res) { 
    Gallery.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect('/login');
        }else{
            res.redirect('/gallery');
        }
    });
});

/* Comment Routes 
===============================================================*/

app.get('/gallery/:id/comments/new', isLoggedIn, function(req,res){
    Gallery.findById(req.params.id, function(err, foundPhoto){
        if(err){
            console.log(err);
        }else{
            photoName = foundPhoto.name.replace(" ", "");
            res.render('comments/new', { photo: foundPhoto, title: 'comment_' + photoName });
        }
    });
});

app.post('/gallery/:id/comments', isLoggedIn, function(req,res){
    Gallery.findById(req.params.id, function (err, foundPhoto){
        if (err) {
            console.log(err);
            res.status(500).redirect('/login');
        } else {
            Comment.create(req.body.comment, function(err, createdComment){
                if(err){
                    req.flash('info', 'Error: Something went wrong');
                    console.log(err);
                }else{
                    createdComment.author.id = req.user.id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();

                    foundPhoto.comments.push(createdComment);
                    foundPhoto.save();
                    req.flash('info', 'Comment added');
                    res.redirect('/gallery/' + foundPhoto._id);
                }
            });
        }
    });
});

app.get('/gallery/:id/comments/:comment_id/edit', checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect('back');
        }else{
            res.render('comments/edit', { photoId: req.params.id, photoUser: req.params.author, comment: foundComment, title: 'edit_Comment' });
        }
    });
});

app.put('/gallery/:id/comments/:comment_id', checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/gallery/' + req.params.id);
        }
    });
});

app.delete('/gallery/:id/comments/:comment_id', checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('message', 'Comment deleted');
            res.redirect('/gallery/' + req.params.id);
        }
    });
});

/* Auth Routes 
===============================================================*/

app.get("/login", function (req, res) {
    res.render('auth/login', { message: req.flash('login') });
});


app.post('/login', passport.authenticate('login',
    {
        successRedirect: 'back',
        failureRedirect: '/login',
        failureFlash: true

    }), function (req, res) { });

app.post('/userlogin', passport.authenticate('login',
    {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true

    }), function (req, res) { });


app.get("/register", function (req, res) {
    res.render('auth/register', { message: req.flash('register') });
});

app.post('/register', passport.authenticate('register', {
    successRedirect: 'back',
    failureRedirect: '/register',
    failureFlash: true
}));

app.post('/userregister', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true
}));


app.get('/logout', function (req, res) {
    req.logout();
    req.flash('info', 'Logged you out');
    res.redirect('back');
});





// app.post('/register', function(req,res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             req.flash('message', err.message);
//             return res.redirect('/register');
//         }else{
//             passport.authenticate('local')(req,res,function(){
//                 unique = Msg[Math.floor(Math.random() * Msg.length)];
//                 req.flash('message', unique);
//                 res.redirect('back');
//             });
//         }
//     });
// });

// app.post('/userregister', function (req, res) {
//     var newUser = new User({ username: req.body.username, password: req.body.password });
//     User.register(newUser, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             req.flash('message', err.message);
//             return res.redirect('/register');
//         } else {
//             passport.authenticate('local')(req, res, function () {
//                 unique = Msg[Math.floor(Math.random() * Msg.length)];
//                 req.flash('message', unique);
//                 res.redirect('/home');
//             });
//         }
//     });
// });


/* Middleware
===============================================================*/

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        console.log('AUTHENTICATED');
        return next();
    }else{
        console.log('PLEASE LOGIN 1');
        req.flash('info', 'Please login first');
        res.redirect('/login');
    } 
}

function checkOwnership(req,res,next){
    if (req.isAuthenticated()) {
        console.log('AUTHENTICATING GALLERY');
        Gallery.findById(req.params.id, function (err, foundPhoto) {
            if (err) {
                req.flash('info', 'Error: Image not found');
                res.redirect('back');
                console.log(err);
            } else {
                if (foundPhoto.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash('info', "Error: Not authorized");
                    res.redirect('back');
                }
            }
        });
    } else {
        console.log('PLEASE LOGIN 2');
        req.flash('info', 'Please login first');
        res.redirect('back');
    }
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('AUTHENTICATING COMMENT');
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect('back');
                console.log(err);
            } else {
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash('info', "Error: Not authorized");
                    res.redirect('back');
                }
            }
        });
    } else {
        console.log('PLEASE LOGIN 3');
        req.flash('info', 'Please login first');
        res.redirect('back');
    }
}



/* Listen PORT
===============================================================*/

app.listen(port, function(){
    console.log('SERVER RUNNING ON PORT ' + port);
});