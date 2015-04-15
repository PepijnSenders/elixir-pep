module.exports = function() {

	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var plugins = require('gulp-load-plugins')();
	var changeCase = require('change-case');
	var gulp = require('gulp');

	return function(module, sequenceChain) {
		var taskName = this.getTaskName('angular-deps', module.config);

		var angularConfig = Config.load('angular', module.config);

		var src = [];
		for (var i = 0; i < angularConfig.deps.length; i++) {
			src.push(Structure.dest.angular(angularConfig.deps[i]) + '/**/*.js');
		}

		gulp.task(taskName, sequenceChain, function() {
			return gulp.src(src)
				.pipe(plugins.concat('deps.js'))
				.pipe(gulp.dest(Structure.dest.angular(module.config.namespace)));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = [src].flatten();

		return task;
	};

}();