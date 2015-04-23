module.exports = function() {

	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var plugins = require('gulp-load-plugins')();
	var changeCase = require('change-case');
	var gulp = require('gulp');
	var _ = require('underscore');
	var Notify = require('../helpers/Notify');

	return function(module) {
		var taskName = this.getTaskName('angular-deps', module.config);

		var angularConfig = Config.load('angular', module.config);

		var src = [], taskDeps = [];
		for (var i = 0; i < angularConfig.deps.length; i++) {
			src.push(Structure.dest.angular(angularConfig.deps[i]) + '/**/*.js');
			taskDeps.push(require('../helpers/TaskBuilder').getTaskName('angular', {
				namespace: angularConfig.deps[i]
			}));
		}

		gulp.task(taskName, taskDeps, function() {
			return gulp.src(src)
				.pipe(plugins.concat('deps.js'))
				.pipe(gulp.dest(Structure.dest.angular(module.config.namespace)))
				.pipe(Notify.message(taskName + ' compiled!'));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = _.flatten([src]);

		return task;
	};

}();