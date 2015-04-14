module.exports = function() {

	var Config = require('../Config');
	var Structure = require('../Structure');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var JSCompiler = require('./commands/JSCompiler');
	var combine = require('stream-combiner2').obj;
	var fs = require('fs');
	var changeCase = require('change-case');

	return function(moduleConfig) {
		var taskName = this.getTaskName('angular', moduleConfig);

		var angularConfig = Config.load('angular', moduleConfig);
		moduleConfig = Object.merge(moduleConfig, {
			js: {
				annotate: true,
				bundle: (angularConfig.name || changeCase.title(moduleConfig.namespace) + 'App') + '.js'
			}
		}, true);

		gulp.task(taskName, function() {
			return JSCompiler(
				gulp.src(angularConfig.src || Structure.sourceFiles.angular(moduleConfig.namespace)), moduleConfig
			)
			.pipe(gulp.dest(Structure.dest.angular(moduleConfig.namespace)));
		});

		return gulp.tasks[taskName];
	};

}();