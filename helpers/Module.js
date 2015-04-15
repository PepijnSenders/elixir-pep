module.exports = function() {

	require('sugar');
	var fs = require('fs');
	var TaskContainer = require('./TaskContainer');
	var TaskBuilder = require('./TaskBuilder');
	var Structure = require('./Structure');
	var changeCase = require('change-case');
	var elixir = require('laravel-elixir');

	var Module = function(config) {
		this.config = config;
		this.taskContainer = new TaskContainer();
	};

	Object.merge(Module, {

		getAppName: function(name, namespace) {
			return (name || changeCase.title(namespace) + 'App');
		}

	});

	Object.merge(Module.prototype, {

		availableMethods: [
			'sass',
			'angular',
			'libs'
		],

		fileDependencies: [],

		addFileDependencies: function() {
			for (var i = 0; i < arguments.length; i++) {
				var fileDependency = arguments[i];

				if (typeof fileDependency === 'string') {
					this.fileDependencies.push(fileDependency);
				} else if ('length' in fileDependency) {
					this.fileDependencies = this.fileDependencies.concat(fileDependency);
				}
			}
		},

		build: function() {
			for (var i = 0; i < this.availableMethods.length; i++) {
				var method = this.availableMethods[i];

				if (this.config[method] || fs.existsSync(Structure.source[method](this.config.namespace))) {
					var task = TaskBuilder[method](this)
					this.taskContainer.push(task);

					// @TODO create class from task so we can create dependencies per task not per module
					elixir.config.registerWatcher(task.name, task.fileDependencies);
					elixir.config.queueTask(task.name);
				}
			}
		},

		checkDeps: function(sequenceChain) {
			if (this.config.angular && this.config.angular.deps) {
				var task = TaskBuilder['angular-deps'](this, []);
				this.taskContainer.push(task);

				elixir.config.registerWatcher(task.name, task.fileDependencies);
				elixir.config.queueTask(task.name);
			}
		}

	});

	return Module;

}();