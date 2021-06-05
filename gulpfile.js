let gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify-es").default,
    notify = require("gulp-notify"),
    imagemin = require("gulp-imagemin"),
    cache = require("gulp-cache"),
    del = require("del"),
    gcmq = require("gulp-group-css-media-queries"),
    cleanCSS = require("gulp-clean-css"),
    pug = require("gulp-pug")

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "dist"
        },
        notify:true,
        open:true,
        browser:"chrome"
        // port:8080
    })
})

gulp.task("html", function(){
    return gulp 
    .src([
        "src/pug/*.pug"
    ])
    .pipe(pug({
        // pretty:true
    }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("css", function(){
    return gulp
    .src([
        "src/sass/*.css",
        "src/sass/*.sass"

    ])
    .pipe(sass({
        outputStyle: "compressed" //expanded, compact
    })
    .on("error", notify.onError()))
    .pipe(autoprefixer(["last 15 versions"],{
        cascade:true
    }))
    .pipe(gcmq("style.css"))
    .pipe(concat("style.css"))
    .pipe(cleanCSS({
        compatibility: "ie8"
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("js", function(){
    return gulp
    .src([
        "src/js/**/*.js"
    ])
    .pipe(uglify())
    .pipe(concat("script.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("files", function(){
    return gulp
    .src([
        "src/*.*"
    ])
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("fonts", function(){
    return gulp
    .src([
        "src/fonts/**/*.*"
    ])
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("images", function(){
    return gulp
    .src([
        "src/img/**/*"
    ])
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task("watch", function(){
    gulp.watch("src/sass/**/*.sass", gulp.parallel("css"))
    gulp.watch("src/js/**/*.js", gulp.parallel("js"))
    gulp.watch("src/pug/**/*.pug", gulp.parallel("html"))
    gulp.watch("src/*.*", gulp.parallel("files"))
    gulp.watch("src/fonts/**/*.*", gulp.parallel("fonts"))
    gulp.watch("src/img/**/*.*", gulp.parallel("images"))

})

gulp.task("default", gulp.parallel("watch","html", "css", "js", "files", "fonts", "images", "browser-sync"))

gulp.task("clean", function(){
    return cache.clearAll()
})

gulp.task ("removeDist", function(){
    return del("dist")
})