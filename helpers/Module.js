module.exports = function() {

	var _ = require('underscore');
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

	_.extend(Module, {

		getAppName: function(name, namespace) {
			return (name || changeCase.title(namespace) + 'App');
		}

	});

	_.extend(Module.prototype, {

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

		remove: function() {
			for (var i = 0; i < this.taskContainer.length; i++) {
				var task = this.taskContainer[i];

				var index = elixir.config.tasks.indexOf(task.name);
				if (index > - 1) {
					elixir.config.tasks.splice(index, 1);
				}

				if (task.name in elixir.config.watchers.default) {
					delete elixir.config.watchers.default[task.name];
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