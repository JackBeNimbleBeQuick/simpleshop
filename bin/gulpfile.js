// Include gulp
var gulp    = require('gulp');
var glob    = require('glob');
var path    = require('path');
var jasmine = require('jasmine');
var sh      = require('shelljs');

// Include Our Plugins
var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var ts      = require("gulp-typescript");
var webpack = require('gulp-webpack');

var tsProject  = ts.createProject("ts/tsconfig.json");
var runSequence = require('run-sequence');

var actions = [];

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../public/css'));
});

gulp.task("ts", function () {
  return tsProject.src()
  .pipe(tsProject());
});

gulp.task('bundle', function () {
  return gulp.src('js/app.js')
    // .pipe(webpack({watch: true}))
    .pipe(gulp.dest('../public/js'));
});

gulp.task('build',function(done){
  runSequence('sass', 'ts', function() {
    console.log('completing build of SASS, TypeSript, Webpack');
    done();
  });
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'watch']);
