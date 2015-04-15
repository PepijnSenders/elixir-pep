module.exports = function() {

	var ModuleContainer = require('./ModuleContainer');
	var Config = require('./Config');
	var gulp = require('gulp');

	var Pep = {
		init: function(elixir, config) {
			Config.setUserConfig(config);

			var moduleContainer = new ModuleContainer();

			moduleContainer.build()
				.setSequenceDependencies();

			var tasks = moduleContainer.getTasks();
		}
	};

	return Pep;

}();