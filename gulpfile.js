const path = require('path');
const child_process = require('child_process');
const gulp = require('gulp');
const jade = require('gulp-jade');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();

const outputDir = path.join(__dirname, 'build');


gulp.task('stylus', () => {
    return gulp.src([
        './src/**/*.styl',
        '!./src/**/_*.styl',
    ]).pipe(
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
