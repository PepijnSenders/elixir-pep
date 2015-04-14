module.exports = function() {

	var Config = require('../Config');
	var Structure = require('../Structure');
	var Notify = require('../Notify');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();

	return function(localConfig) {
		var taskName = this.getTaskName('libs', localConfig);

		gulp.task(taskName, function() {

		});

		return gulp.tasks[taskName];
	};

}();