
var gulp            = require('gulp'),
watch               = require('gulp-watch'),
postcss             = require('gulp-postcss'),
autoprefixer        = require('autoprefixer'),
cssvars             = require('postcss-simple-vars'),
cssnested           = require('postcss-nested'),
cssimport           = require('postcss-import'),
mixins              = require('postcss-mixins'),
browserSync         = require('browser-sync').create(),
hexrgba             = require('postcss-hexrgba'),
webpack             = require('webpack');
  


gulp.task('styles', function () {     // pipe css file through post-css filters to temp dir
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssimport, mixins, cssvars, cssnested, hexrgba, autoprefixer]))      // postcss + autoprefixer create vendor prefixes for css     
        .pipe(gulp.dest('./app/public/css'));              // cssimport will replace @import with text from css styles (modules)
});                                                 // cssvars lets you use variables in css
                                                   // cssnested lets you nest css styles (ie SASS)
gulp.task('watch', function () {

    browserSync.init({

        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.js', function () {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function () {
        gulp.start('scriptsRefresh');
    });

});

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
});

gulp.task('scripts', function (callback) {
    webpack(require('./webpack.config'), function (err, stats) {
        if (err) {
            console.log('ERRORS: ' + err.message);
        }
        console.log('STATUS: ' + stats);
        callback();     // GULP can be sure Webpack completed
    });
});