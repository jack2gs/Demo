var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    run = require("gulp-run"),
    nightwatch = require("gulp-nightwatch"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    browserSync = require("browser-sync"),
    karma = require("karma").server,
    uglyfy = require("gulp-uglify"),
    docco = require("gulp-docco"),
    runSequence = require("run-sequence"),
    header = require("gulp-header"),
    pkg = require(__dirname + "/package.json");

var tsProject = tsc.createProject({
    removeComment: false,
    noImplicitAny: false,
    target: "ES5",
    module: "commonjs",
    declarationFiles: false
});

gulp.task("build-source", function(){
    return gulp.src(__dirname + "/source/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest(__dirname + "/build/source"));
});

var tsTestProject = tsc.createProject({
    removeComment: false,
    noImplicitAny: false,
    target: "ES5",
    module: "commonjs",
    declarationFiles: false
});
gulp.task("build-test", function(){
    return gulp.src(__dirname + "/test/*.test.ts")
        .pipe(tsTestProject())
        .pipe(gulp.dest(__dirname + "/build/test"));
});

gulp.task("bundle-source", function(){
    var b = browserify({
        standalone: "demos",
        entries: __dirname + "/build/source/demos.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("demos.js"))
        .pipe(buffer())
        .pipe(gulp.dest(__dirname + "/bundled/source/"));
});

gulp.task("bundle-test", function(){
    var b = browserify({
        standalone: "test",
        entries: __dirname + "/build/test/bdd.test.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bdd.test.js"))
        .pipe(buffer())
        .pipe(gulp.dest(__dirname + "/bundled/test/"));
});