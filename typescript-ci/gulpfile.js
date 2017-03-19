var gulp = require("gulp")
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    tsify = require("tsify"),
    paths = {
        pages: ["src/*.html"]
    };

gulp.task("copy-html", function(){
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function(){
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCatche: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
});