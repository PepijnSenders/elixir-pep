module.exports = function() {

	var _ = require('underscore');
	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var Notify = require('../helpers/Notify');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var JSCompiler = require('./commands/JSCompiler');

	return function(module) {
		var taskName = this.getTaskName('libs', module.config);

		var libsConfig = Config.load('libs', module.config);

		libsConfig = _.deepExtend({
			js: {
				bundle: (libsConfig.name || module.config.namespace) + '.bundle.js'
			}
		}, libsConfig);

		libsConfig.js.traceur = false;

		gulp.task(taskName, function() {
			return JSCompiler(gulp.src(libsConfig.src).pipe(plugins.if(libsConfig.js.filesize, plugins.filesize())), libsConfig)
				.pipe(plugins.if(libsConfig.js.filesize, plugins.filesize()))
				.pipe(gulp.dest(Structure.dest.libs(module.config.namespace)))
				.pipe(Notify.message(taskName + ' compiled!'));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = _.flatten([libsConfig.src]);

		return task;
	};

}();