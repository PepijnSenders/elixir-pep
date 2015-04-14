module.exports = function() {

	var Config = require('../Config');
	var Structure = require('../Structure');
	var Notify = require('../Notify');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var CSSCompiler = require('./commands/CSSCompiler');

	return function(moduleConfig) {
		var taskName = this.getTaskName('sass', moduleConfig);

		var sassConfig = Config.load('sass', moduleConfig);

		gulp.task(taskName, function() {
			return CSSCompiler(
				gulp.src(sassConfig.src || Structure.sourceFiles.sass(moduleConfig.namespace))
					.pipe(plugins.sass()),
				moduleConfig
			)
			.pipe(gulp.dest(Structure.dest.sass(moduleConfig.namespace)))
			.pipe(Notify.message('Sass compiled!'));
		});

		return gulp.tasks[taskName];
	};

}();