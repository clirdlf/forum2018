require('dotenv').config();

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var sourcemaps  = require('gulp-sourcemaps');
var include     = require('gulp-include');
var uglify      = require('gulp-uglify'); //@see https://www.npmjs.com/package/gulp-uglify
var pump        = require('pump');

/**
 * Browser sync for WP theme
 */
gulp.task('browser-sync', function() {
    var files = [
        '**/*.php',
        '**/*.{png,jpg,gif}',
        '**/**/*.css',
        './js/*.js'
    ];
  console.log('proxy' + process.env.DEV_URL);

    browserSync.init(files, {
      // Read here http://www.browsersync.io/docs/options/
      proxy: process.env.DEV_URL,
      port: process.env.DEV_PORT,
      injectChanges: true
    });
});

/**
 * Compile JS files from js/scripts.js using gulp-include
 */
gulp.task('scripts', function() {
    pump([
        gulp.src(['./src/scripts.js']),
        include(),
        gulp.dest('./src/build/'),
    ]);
});

gulp.task('compress', function(cb) {
    pump([
            gulp.src('src/build/*.js'),
            uglify(),
            gulp.dest('js')
        ],
        cb
    );
});

/**
 * Compile files from _scss into css (for live injecting)
 */
gulp.task('sass', function() {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            onError: browserSync.notify,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('stylesheets'))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('stylesheets'))
        .pipe(browserSync.stream({match: '**/*.css'}));
        // .pipe(browserSync.reload({
            // stream: true
        // }))
        // .pipe(gulp.dest('stylesheets'));
});

gulp.task('js', ['scripts', 'compress']);

gulp.task('watch', function() {
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch('src/*.js', ['scripts', 'compress']);
});

gulp.task('default', ['browser-sync', 'watch']);
