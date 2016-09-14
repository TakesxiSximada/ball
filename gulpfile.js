const path = require('path');
const child_process = require('child_process');
const gulp = require('gulp');
const jade = require('gulp-jade');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const outputDir = path.join(__dirname, 'build');

const image_pattern = [
    './src/**/*.png',
    '!./src/**/_*.png',
]

gulp.task('image', () => {
    return gulp.src(
        image_pattern
    ).pipe(
        imagemin()
    ).pipe(
        gulp.dest(outputDir)
    );
});


gulp.task('stylus', () => {
    return gulp.src([
        './src/**/*.styl',
        '!./src/**/_*.styl',
    ]).pipe(
        plumber()
    ).pipe(
        stylus()
    ).pipe(
        gulp.dest(outputDir)
    );
});


gulp.task('jade', () => {
    return gulp.src([
        './src/**/*.jade',
        '!./src/**/_*.jade',
    ]).pipe(
        plumber()
    ).pipe(
        jade({
            pretty: true,
        })
    ).pipe(
        gulp.dest(outputDir)
    );
});


gulp.task('webpack', () => {
    var child = child_process.exec('node_modules/.bin/webpack -w');
});


gulp.task('watch', () => {
    gulp.start('webpack');
    watch([
        './src/**/*.jade',
        './src/**/*.styl',
        './src/**/*.js',
        './src/**/*.msx',
    ], () => {
        gulp.start('jade');
        gulp.start('stylus');
    });

    watch(image_pattern, () => {
        gulp.start('image');
    });
});


gulp.task('reload', () => {
    watch(outputDir, browserSync.reload)
});


gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: outputDir,
        }
    });
});


gulp.task('default', [
    'watch',
    'reload',
    'server',
]);
