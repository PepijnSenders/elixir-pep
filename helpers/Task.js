module.exports = function() {

	var elixir = require('laravel-elixir');

	var Task = {

		add: function(name, fileDependencies) {
			elixir.config.registerWatcher(name, fileDependencies);
			elixir.config.queueTask(name);
		}

	};

	return Task;

}();