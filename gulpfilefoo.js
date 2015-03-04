var gulp = require('gulp');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');

gulp.task('templates', function() {
  // Load templates from the source/templates/ folder relative to where gulp was executed
  gulp.src('templates/**/*.hbs')
    // Compile each Handlebars template source file to a template function using Ember's Handlebars
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    // Wrap each template function in a call to Ember.Handlebars.template
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    // Declare template functions with Ember.TEMPLATES according to their path and filename
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true, // Avoid duplicate declarations
      processName: function(filePath) {
        // Allow nesting based on path using gulp-declare's processNameByPath()
        // You can remove this option completely if you aren't using nested folders
        // Drop the source/templates/ folder from the namespace path by removing it from the filePath
        return declare.processNameByPath(filePath.replace('templates/', ''));
      }
    }))
    // Concatenate down to a single file
    .pipe(concat('templates.js'))
    // Write the output into the templates folder
    .pipe(gulp.dest('./'));
});