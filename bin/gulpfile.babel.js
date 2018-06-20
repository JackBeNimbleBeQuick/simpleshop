// Include gulp
import gulp     from 'gulp';
import register from 'babel-register';

// Include Our Plugins
import sass    from 'gulp-sass';
import concat  from 'gulp-concat';
import uglify  from 'gulp-uglify';
import rename  from 'gulp-rename';
import ts      from "gulp-typescript";
import maps    from 'gulp-sourcemaps';

// Include useful stuff
import glob    from 'glob';
import path    from 'path';
import fs      from "fs";
import sh      from 'shelljs';
import ps      from 'child_process';

import webpack from 'webpack';
import wp_conf from './webpack.config';

let exec = ps.exec;


let tsProject  = ts.createProject("tsconfig.json");
let actions = [];

let sources = {
  styles:  `sass/**/*.scss`,
  scripts: `ts/**/*.ts`,
  webpack_start: `${__dirname}/ts/index.tsx`,
  webpack_end: `${__dirname}/public/js/app.js`,
};

let targets = {
  index: '../public/index.html'
}

let cleanup =  [
  'js'
]

/**
 * Put away the toys and sweep the floor
 * @param  {Function} done
 * @return done()
 */
let clean = (done) => {
  for(let i in cleanup){
    let _path = __dirname+'/'+cleanup[i];
    sh.rm('-rf', _path);
  }
  return done();
}

/**
 * Create / Overwrite public/css/main.css
 * @return {Void} results in compiled files place into public foler
 */
let css = () => gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../public/css'));

/**
 * open into local browser => assumes the default browser is set to handle .html extensions

 * @param  {Function}
 * @return {Function}
 */
let open = (done) => {
  let err = {};
  if (process.platform == 'darwin') {
    exec((`open -a Google\\ Chrome http://localhost:8093`), (err, stdout, stderr) => {
        if (stdout != "") console.log(stdout);
        if (stderr != "") console.log(stderr);
        return done(err);
    });
  } else {
    exec((`start chrome "https://localhost:8093"`), (err, stdout, stderr) => {
        if (stdout != "") console.log(stdout);
        if (stderr != "") console.log(stderr);
        return done(err);
    });
  }

}

/**
 * Webpack files to public
 * @param  {Function} fn just the gulp env function in case you need to return it 8^) ?
 * @return {Gulp} task
 */
let compile = (done) => {
  console.log(`\n\nwebpack taking from: ${sources.webpack_start}`);
  console.log(`webpack putting to: ${sources.webpack_end}`);
  exec('npm run-script build', (err, stdo, sterr)=>{
    console.log('\n\nList of files being compiled');
    console.log(stdo);
    console.log(sterr);
    return done(err);
  });
}

/**
 * Run wepack server
 * @param  {Function} done
 * @return {void}
 */
let serveWP = (done) => {
  console.log(`\n\nRunning webpack-serve`);

  setTimeout( ()=>{
    console.log(`\nWait for it... this takes a minute 8^)`);
   } ,1000 );

  exec('npm start', (err, stdo, sterr)=>{
    console.log(stdo);
    console.log(sterr);

    console.log('\n {control} c to stop server...')
    return done(err);
  });
}

let watchSass = (done) => {
  gulp.watch([
      sources.styles
  ]).on('change', ()=>{ gulp.series([css])(done)});
}

/**
 * Does full build
 * @param  {Function} done
 * @return done()
 */
let restart = (done) => {
  return gulp.series([open, serveWP])(done);
}

/**
 * Does full build
 * @param  {Function} done
 * @return done()
 */
let build = (done) => {
  return gulp.series([css, compile, serveWP])(done);
}

export {
  css,
  open,
  restart,
  compile,
  serveWP,
  watchSass,
  build,
  clean,
}
