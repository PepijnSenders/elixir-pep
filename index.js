require('sugar');

module.exports = function() {

	var ModuleContainer = require('./ModuleContainer');
	var Config = require('./Config');
	var gulp = require('gulp');

	var Pep = {
		start: function(config) {
			Config.setUserConfig(config);

			var moduleContainer = new ModuleContainer();

			moduleContainer.build()
				.setSequenceDependencies();

			gulp.task('default', moduleContainer.getTasks(), function() {

			});
		}
	};

	return Pep;

}();