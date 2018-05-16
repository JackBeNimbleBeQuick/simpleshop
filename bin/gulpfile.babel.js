// Include gulp
import gulp     from 'gulp';
import register from 'babel-register';

// Include Our Plugins
import sass    from 'gulp-sass';
import concat  from 'gulp-concat';
import uglify  from 'gulp-uglify';
import rename  from 'gulp-rename';
import ts      from "gulp-typescript";

// Include useful stuff
import glob     from 'glob';
import path     from 'path';
import sh       from 'shelljs';

import webpack from 'webpack-stream';

let tsProject  = ts.createProject("tsconfig.json");
let actions = [];

let sources = {
  styles:  `sass/**/*.scss`,
  scripts: `ts/**/*.ts`
};
// console.log(tsProject());

/**
 * Create / Overwrite public/css/main.css
 * @return {Void} results in compiled files place into public foler
 */
let css = () => gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../public/css'));

  /**
   * Webpack and move transpiled files to public
   * @param  {Function} fn just the gulp env function in case you need to return it 8^) ?
   * @return {Gulp} task
   */
let moveJs = (done) => {
  console.log('Moving transpiled js to public');
  return gulp.src('js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'app.js'
      }
    })).pipe(gulp.dest('../public/js'));

}

/**
 * TS transpile step of a build
 * @param  {Function} done
 * @return {tsProject.result}
 */
let transpile = (done) => {
  console.log('Transpiling ts to js using tsconfig.json');

  let result = gulp.src('ts/**/*.ts').pipe(tsProject());
  return result.js
    .pipe(gulp.dest('js'));
}


let js = (done) => {
  return gulp.series([transpile, moveJs])(done);
}

let build = (done) => {
  return gulp.series([transpile, css, moveJs])(done);
}

export {
  js,
  css,
  moveJs,
  build
}
