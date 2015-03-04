var gulp = require('gulp');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');

gulp.task('default', function() {
  gulp.src('templates/**/*.hbs')
    .pipe(emberTemplates({
      compiler: require('./node_modules/ember-template-compiler/vendor/ember-template-compiler')
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./'));
});