// Requiring Gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Requiring Sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// Auto refresh browser on file save
var browserSync = require('browser-sync');
// Require merge-stream to output multilple tasks to multiple destinations
var merge = require('merge-stream');
// Require gulp-jade
var jade = require('gulp-jade');


// Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// SASS
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.+(scss|sass)') // Gets all files ending with .scss or .sass in app/scss
        .pipe(sourcemaps.init()) // Initialize sourcemap plugin
        .pipe(sass()) // Initialize sass
        .pipe(autoprefixer()) // Passes it through gulp-autoprefixer 
        .pipe(sourcemaps.write()) // Writing sourcemaps
        .pipe(gulp.dest('app/css'))
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});

// JADE
gulp.task('jade', function () {
    gulp.src('app/jade/*.jade')
        .pipe(jade({
            pretty: true})) // pip to jade plugin
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// WATCH 'gulp'
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
  gulp.watch('app/jade/**', ['jade']);
  gulp.watch('app/index.html', browserSync.reload);
});

gulp.task('prod', function () {
    var html = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var css = gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'));

    var img = gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('dist/images'));

    var js = gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'));

    return merge(html, css, img, js);
});

// Creating a default task
gulp.task('default', ['sass', 'jade', 'watch', 'prod']);