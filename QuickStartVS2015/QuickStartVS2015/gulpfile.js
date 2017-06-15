// gulpfile.js 

var gulp = require('gulp');
var Builder = require('systemjs-builder');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

var appProd = './scripts';
var appDevTemp = './scripts/temp/angular2';

//
// the following series of tasks builds each component of angular 2 into a temp directory 
// for caching in development mode
//
gulp.task('@angular.js', function () {

    var SystemBuilder = require('systemjs-builder');

    var builder = new SystemBuilder('./', 'systemjs.config.js');

    builder.bundle('@angular/core', appDevTemp + '/core.js');
    builder.bundle('@angular/compiler', appDevTemp + '/compiler.js');
    builder.bundle('@angular/forms', appDevTemp + '/forms.js');
    builder.bundle('@angular/common', appDevTemp + '/common.js');
    builder.bundle('@angular/http', appDevTemp + '/http.js');
    builder.bundle('@angular/router', appDevTemp + '/router.js');
    builder.bundle('@angular/platform-browser', appDevTemp + '/platform-browser.js');
    builder.bundle('@angular/platform-browser-dynamic', appDevTemp + '/platform-browser-dynamic.js');
    builder.bundle('rxjs/Rx', appDevTemp + '/rxjs.js');
    return;

});
//
//  minify the development build for angular 2
//
gulp.task('buildForDevelopment', ["@angular.js"],
    function () {
        return gulp.src(appDevTemp + '/*.js').pipe(uglify())
                  .pipe(concat('angular2-dev.min.js')).pipe(gulp.dest(appProd));
    });