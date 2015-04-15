module.exports = function() {

	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var Notify = require('../helpers/Notify');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var CSSCompiler = require('./commands/CSSCompiler');

	return function(module) {
		var taskName = this.getTaskName('sass', module.config);

		var sassConfig = Config.load('sass', module.config);

		var sassSource = sassConfig.src || Structure.sourceFiles.sass(module.config.namespace);

		gulp.task(taskName, function() {
			return CSSCompiler(
				gulp.src(sassSource)
					.pipe(plugins.if(jsConfig.filesize, plugins.filesize()))
					.pipe(plugins.sass()),
				module.config
			)
			.pipe(plugins.if(jsConfig.filesize, plugins.filesize()))
			.pipe(gulp.dest(Structure.dest.sass(module.config.namespace)))
			.pipe(Notify.message('Sass compiled!'));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = [sassSource].flatten();

		return task;
	};

}();