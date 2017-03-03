'use strict';

var gulp = require('gulp');
var del = require('del');
var gulpUseref = require('gulp-useref');
var serve = require('gulp-serve');
const DIST = './dist';

gulp.task('clean', () => {
  return del([DIST]);
});

gulp.task('test', () => {
  return true;
});

gulp.task('images', ['clean'], () => {
  return gulp.src('bower_components/hon-bootstrap-template/dist/images/*.png')
    .pipe(gulp.dest(DIST + '/images'));
});

gulp.task('build', ['images'], () => {
  return gulp.src('src/*.html')
    .pipe(gulpUseref())
    .pipe(gulp.dest(DIST));
});

gulp.task('serve', ['build'], serve(DIST));

gulp.task('default', ['serve']);
