module.exports = function() {

	require('sugar');
	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var Notify = require('../helpers/Notify');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var JSCompiler = require('./commands/JSCompiler');

	return function(module) {
		var taskName = this.getTaskName('libs', module.config);

		var libsConfig = Config.load('libs', module.config);

		libsConfig = Object.merge({
			js: {
				bundle: (libsConfig.name || module.config.namespace) + '.bundle.js'
			}
		}, libsConfig, true);

		libsConfig.js.traceur = false;

		gulp.task(taskName, function() {
			return JSCompiler(gulp.src(libsConfig.src), libsConfig)
				.pipe(gulp.dest(Structure.dest.libs(module.config.namespace)));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = [libsConfig.src].flatten();

		return task;
	};

}();