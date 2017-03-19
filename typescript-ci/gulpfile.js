var gulp = require("gulp")
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    watchify = require("watchify"),
    tsify = require("tsify"),
    gutil = require("gulp-util"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    buffer = require("vinyl-buffer"),
    browserSync = require('browser-sync').create(),
    paths = {
        pages: ["src/*.html"]
    };

var watchedBrowserify = watchify(browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCatche: {}
}).plugin(tsify));

gulp.task("copy-html", function(){
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle(){
    return watchedBrowserify
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist")); 
}

gulp.task("default", ["copy-html"], bundle);

gulp.task("browser-sync", function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("./dist/**/*.*").on("change", browserSync.reload);
});

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);