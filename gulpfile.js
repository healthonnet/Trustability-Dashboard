'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', () => {
  return runSequence('clean', 'move-index', 'move-bower', 'move-js');
});

gulp.task('move-index', () => {
  return gulp.src(['index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('move-bower', () => {
  return gulp.src(['bower_components/**/*'])
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('move-js', () => {
  return gulp.src(['js/**'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('test', () => {
  return true;
});

gulp.task('clean', () => {
  return del(['dist']);
});
