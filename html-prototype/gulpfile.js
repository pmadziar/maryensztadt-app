const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const data = require('gulp-data');
const path = require('path');
const flatten = require('gulp-flatten');
const moment = require('moment');
const gulpFilter = require('gulp-filter');
const livereload = require('gulp-livereload');
const jsonfile = require('jsonfile')


const buildDir = "./dist";
const jsDir = buildDir + "/js";
const cssDir = buildDir + "/css";
const fontDir = buildDir + "/fonts";

const projectName = "html-prototype";


// update version number and date for HB templates
// let hbData = require("./data.json");

gulp.task('update_version', () => {
    let hbData = jsonfile.readFileSync("./data.json");
    hbData.date = moment().format("YYYY/MM/DD HH:mm:ss");
    let version = 0;
    if(hbData.version|| hbData.version === 0){
        version = hbData.version + 1;
    }

    hbData.version = version;

    jsonfile.writeFileSync("./data.json", hbData);
});

var handlebarsHelpers = require("./handlebars/handlebarsHelpers.js");



// Gulp Sass Task 
gulp.task('sass', function() {

    var sassConfig = {
        errLogToConsole: true,
        sourceComments : 'normal',
        indentedSyntax: false,
        includePaths: [
            __dirname + '/scss/partials',
            __dirname + '/node_modules/typi/scss',
            __dirname + '/node_modules/susy/sass',
            __dirname + '/node_modules/normalize-sass'
        ]
    };

    return gulp.src('scss/*.scss')
        // Initializes sourcemaps
        .pipe(sourcemaps.init())
        .pipe(sass(sassConfig))
        // Writes sourcemaps into the CSS file
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDir))
        .pipe(livereload());
});

// handllebars HTML
gulp.task('handlebars', function () {
    var templateData;
    var options = {
        ignorePartials: false,
        batch : ['./handlebars/partials'],
        helpers : handlebarsHelpers.functions
    };

    let hbData = jsonfile.readFileSync("./data.json");

    return gulp.src('handlebars/*.hbs')
        .pipe(data(function(file) {
            templateData = hbData;
            return templateData;
        }))
        .pipe(handlebars(templateData, options))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(buildDir))
        .pipe(livereload());
});


gulp.task('default',['sass', 'handlebars']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['handlebars/*.hbs', 'handlebars/partials/_*.hbs'], ['update_version', 'handlebars']);
  gulp.watch('scss/**/*.scss', ['update_version', 'handlebars', 'sass']);
});
