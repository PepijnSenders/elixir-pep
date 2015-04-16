module.exports = function() {

	var _ = require('underscore');
	var Task = require('../helpers/Task');
	var gulp = require('gulp');
	var changeCase = require('change-case');

	var Loader = function(configFile) {
		this.configFile = configFile;
	};

	_.extend(Loader, {

		tasks: [
			'CreateModule'
		],

		createConsoleName: function(task) {
			return ['console', changeCase.paramCase(task)].join('@');
		}

	});

	_.extend(Loader.prototype, {

		plug: function() {
			for (var i = 0; i < Loader.tasks.length; i++) {
				var task = Loader.tasks[i];
				var taskName = Loader.createConsoleName(task);

				var configFile = this.configFile;
				gulp.task(taskName, function(done) {
					require('./' + task)(configFile, done);
				});
			}
		}

	});

	return Loader;

}();