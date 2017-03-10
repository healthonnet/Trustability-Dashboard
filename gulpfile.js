'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpUseref = require('gulp-useref');
const gls = require('gulp-live-server');
const DIST = './dist';

gulp.task('clean', () => {
  return del([DIST]);
});

gulp.task('test', () => {
  return true;
});

gulp.task('images', ['clean'], () => {
  return gulp.src('bower_components/hon-bootstrap-template/dist/images/*.png')
    .pipe(gulp.dest(DIST + '/public/images'));
});

gulp.task('build', ['build-client'], () => {
  return gulp.src('./server/**/*')
    .pipe(gulp.dest(DIST));
});

gulp.task('build-client', ['images'], () => {
  return gulp.src('./client/*.html')
    .pipe(gulpUseref())
    .pipe(gulp.dest(DIST + '/public'));
});

gulp.task('serve', ['build'], () => {
  const server = gls.new(DIST + '/www');
  server.start();
});

gulp.task('default', ['serve']);
