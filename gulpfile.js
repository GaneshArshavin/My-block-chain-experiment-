'use strict'

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const git = require('gulp-git');
const bump = require('gulp-bump'),
  filter = require('gulp-filter'),
  fs = require('fs'),
  tag_version = require('gulp-tag-version'),
  { normalize } = require('path'),
  { spawn } = require('child_process');

async function _exec(command, args = [], options = { shell: true, stdio: 'inherit' }) {
  return new Promise((resolve, reject) => spawn(normalize(command), args, options)
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : resolve())
  );
}

gulp.task('clean_nyc', () => del(['./nyc_']));

gulp.task('test', ['clean_nyc'], () => _exec('node_modules/.bin/nyc',
  [normalize('node_modules/.bin/mocha tests/**/*.js')]));

gulp.task('check-coverage', ['clean_nyc'], () => _exec('node_modules/.bin/nyc',
  [normalize('check-coverage tests/**/*.js')]));

gulp.task('report-coverage', [], (cb) => {
  _exec('node_modules/.bin/nyc', [normalize('report --reporter=lcov')]);
  fs.writeFile('COVERAGE.md', "```", 'utf8', () => {
    _exec('node_modules/.bin/nyc', [normalize('report --reporter=text-summary >> COVERAGE.md')]).then(function () {
      fs.writeFile('COVERAGE.md', "```", { encoding: 'utf8', flag: 'a' }, (err) => {
        if (err) {
          cb(err);
        }
      });
    })
  });
});
// build the main source into the min file
gulp.task('eslint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['lib/**/*.js', 'server.js', 'app.js', 'gulpfile.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({
      config: './.eslintrc.json',
      fix: true
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
})

gulp.task('clean', cb => {
  del(['./docs', './coverage', './nyc_output'], cb);
})

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json'])
    // bump the version number in those files
    .pipe(bump({
      type: importance
    }))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))

    // read only one file to get the version number
    .pipe(filter('package.json'))
    // **tag it in the repository**
    .pipe(tag_version())
}

gulp.task('patch', function () {
  return inc('patch')
})
gulp.task('feature', function () {
  return inc('minor')
})
gulp.task('release', function () {
  return inc('major')
})

gulp.task('precommit', ['clean', 'eslint', 'check-coverage', 'report-coverage']);

// Default task to run eslint and mocha in series.
gulp.task('default', ['clean', 'eslint', 'test'])
