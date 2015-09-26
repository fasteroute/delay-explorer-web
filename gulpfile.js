"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var sass = require('gulp-sass'); // Transform SASS to CSS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixer for CSS

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        img: './src/img/*',
        js: './src/**/*.js',
        sassDir: './src/sass/**/*.scss',
        sassPaths: [
            './node_modules/bootstrap-sass/assets/stylesheets/',
        ],
        cssPaths: [
            './node_modules/leaflet/dist/leaflet.css',
            './node_modules/leaflet-label/dist/leaflet.label.css',
            './node_modules/webui-popover/dist/jquery.webui-popover.css',
            './node_modules/font-awesome/css/font-awesome.css'
        ],
        fontsPaths: [
          './node_modules/bootstrap-sass/assets/fonts/**/*',
          './node_modules/font-awesome/fonts/**/*'
        ],
        dist: './dist',
        mainJs: './src/js/app.js'
    },
    autoprefixerBrowsers: [
        // Taken from Bootstrap 3.3.5 configuration.
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ],
}

//Start a local development server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
    gulp.src(config.paths.img)
        .pipe(gulp.dest(config.paths.dist + '/img/'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src(config.paths.sassDir)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: config.paths.sassPaths
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('autoprefixer', function() {
    gulp.src('./dist/css')
        .pipe(autoprefixer({
            browsers: config.autoprefixerBrowsers,
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('css', function () {
    gulp.src(config.paths.cssPaths)
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function() {
  gulp.src(config.paths.fontsPaths)
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.sassDir, ['sass']);
});

gulp.task('default', ['html', 'js', 'sass', 'autoprefixer', 'css', 'fonts', 'lint', 'open', 'watch']);
