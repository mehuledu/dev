/// <binding BeforeBuild='buildForDevelopment' />
// gulpfile.js 

var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var merge = require('merge2');
var connect = require('gulp-connect');
var tslint = require('gulp-tslint');

var tsproj = ts.createProject('./src/tsconfig.json');
var exmapProj = ts.createProject('./src/tsconfig.json', { declaration: false });

gulp.task('compile:src', function () {
    var tsResult = gulp
        .src(['components/**/*.ts', 'typings/**/*.ts'])
        .pipe(tsproj());

    return merge([
        tsResult.dts.pipe(gulp.dest('./components/')),
        tsResult.js.pipe(gulp.dest('./components/'))
    ]);
});

gulp.task('compile:examples', function (done) {
    var promises = [];
    promises.push(new Promise(function (resolve) {
        gulp.src(['examples/**/*.ts', 'typings/**/*.ts'])
            .pipe(exmapProj())
            .pipe(gulp.dest('dist'))
            .on('end', function () {
                resolve();
            });
    }))

    promises.push(new Promise(function (resolve) {
        gulp.src(['examples/**/*.html'])
        .pipe(gulp.dest('dist'))
        .on('end', function () {
            resolve();
        });

    }))

    promises.push(new Promise(function (resolve) {
        gulp.src(['examples/**/*.js'])
            .pipe(gulp.dest('dist'))
            .on('end', function () {
                resolve();
            });
    }));

    promises.push(new Promise(function (resolve) {
        gulp.src(['examples/**/*.css'])
            .pipe(gulp.dest('dist'))
            .on('end', function () {
                resolve();
            });
    }));

    Promise.all(promises).then(function () {
        done();
    });
});

gulp.task('compile:index', function () {
    var tsResult = gulp.src(['./index.ts', 'typings/**/*.ts'])
            .pipe(tsproj());

    return merge([
        tsResult.dts.pipe(gulp.dest('./')),
        tsResult.js.pipe(gulp.dest('./'))
    ]);
});

gulp.task('compile', gulp.series('compile:src', 'compile:index', 'compile:examples'));

gulp.task('lint:src', function () {
    return gulp.src(['components/**/*.ts'])
            .pipe((tslint({
                formatter: "verbose"
            })))
            .pipe(tslint.report());
});

gulp.task('lint:examples', function () {
    return gulp.src(['examples/**/*.ts'])
            .pipe((tslint({
                formatter: "verbose"
            })))
            .pipe(tslint.report());
});

//gulp.task('lint', gulp.series('lint:src', 'lint:examples'));

gulp.task('serve', function () {
    connect.server();
});

gulp.task('clean', function () {
    return del(['components/**/*.js', 'components/**/*.d.ts', 'dist', 'index.js', 'index.d.ts'])
});

gulp.task('build', gulp.series('clean', 'lint', 'compile'));

gulp.task('publish', gulp.series('clean', 'lint', 'compile:src', 'compile:index'));


/** 
Ref: http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
*/