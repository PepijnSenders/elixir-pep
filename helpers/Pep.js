module.exports = function() {

	var ModuleContainer = require('./ModuleContainer');
	var Config = require('./Config');
	var gulp = require('gulp');
	var RestartWatcher = require('./RestartWatcher');

	var Pep = {
		init: function(elixir, configFile) {
			var config = require(configFile);
			Config.setUserConfig(config);

			var moduleContainer = new ModuleContainer();

			moduleContainer.build()
				.setSequenceDependencies();

			var tasks = moduleContainer.getTasks();

			new RestartWatcher(configFile);
		}
	};

	return Pep;

}();