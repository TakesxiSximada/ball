const path = require('path');
const gulp = require('gulp');
const jade = require('gulp-jade');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();

const outputDir = path.join(__dirname, 'build');


gulp.task('stylus', () => {
    return gulp.src([
        './src/css/**/*.styl',
        '!./src/css/**/_*.styl',
    ]).pipe(
        stylus()
    ).pipe(
        gulp.dest(outputDir)
    );
});


gulp.task('jade', () => {
    return gulp.src([
        './src/html/**/*.jade',
        '!./src/html/**/_*.jade',
    ]).pipe(
        jade({
            pretty: true,
        })
    ).pipe(
        gulp.dest(outputDir)
    );
});


gulp.task('watch', () => {
    watch([
        './src/html/**/*.jade',
        './src/html/**/*.styl',
    ], () => {
        gulp.start('jade');
        gulp.start('stylus');
    });
});


// gulp.task('browser-sync', () => {
//     browserSync.init({
//         server: {
//             baseDir: outputDir,
//         }
//     });
// });


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


gulp.task('default', ['watch', 'reload', 'server']);
