module.exports = function() {

	var ModuleContainer = require('./ModuleContainer');
	var Config = require('./Config');
	var gulp = require('gulp');
	var util = require('gulp-util');
	var RestartWatcher = require('./RestartWatcher');

	var moduleContainer;

	var Pep = {
		init: function(configFile) {
			if (moduleContainer) {
				moduleContainer.remove();
			}

			util.log('Using config: ' + configFile);
			var config = require(configFile);
			Config.setUserConfig(config);

			moduleContainer = new ModuleContainer();

			moduleContainer.build()
				.setSequenceDependencies();

			var tasks = moduleContainer.getTasks();

			gulp.task('default', tasks, function() {
				process.exit(0);
			});
		}
	};

	return Pep;

}();