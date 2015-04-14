module.exports = function() {

	var Config = require('../Config');
	var Structure = require('../Structure');
	var plugins = require('gulp-load-plugins')();
	var changeCase = require('change-case');
	var gulp = require('gulp');

	return function(moduleConfig, sequenceChain) {
		var taskName = this.getTaskName('angular-deps', moduleConfig);

		var angularConfig = Config.load('angular', moduleConfig);

		var src = [];
		for (var i = 0; i < angularConfig.deps.length; i++) {
			src.push(Structure.dest.angular(angularConfig.deps[i]) + '/**/*.js');
		}

		console.log(src);

		src.push(Structure.dest.angular(moduleConfig.namespace) + '/**/*.js');

		var moduleName = (angularConfig.name || changeCase.title(moduleConfig.namespace) + 'App') + '.js';
		gulp.task(taskName, sequenceChain, function() {
			return gulp.src(src)
				.pipe(plugins.concat(moduleName))
				.pipe(gulp.dest(Structure.dest.angular(moduleConfig.namespace)));
		});

		return gulp.tasks[taskName];
	};

}();