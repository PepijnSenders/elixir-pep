module.exports = function() {

	require('sugar');
	var Config = require('./Config');
	var Module = require('./Module');

	var ModuleContainer = function() {
		var modules = Config.load('modules');
		for (var i = 0; i < modules.length; i++) {
			var moduleConfig = modules[i];
			var module = new Module(moduleConfig);
			this.push(module);
		}
	};
	ModuleContainer.prototype = new Array();

	Object.merge(ModuleContainer.prototype, {

		build: function() {
			for (var i = 0; i < this.length; i++) {
				var module = this[i];

				module.build();
			}

			return this;
		},

		getFileDependencies: function() {
			var fileDependencies = [];

			for (var i = 0; i < this.length; i++) {
				var module = this[i];

				fileDependencies = fileDependencies.concat(module.fileDependencies);
			}

			return fileDependencies;
		},

		setSequenceDependencies: function() {
			var sequenceChain = [];

			for (var i = 0; i < this.length; i++) {
				var module = this[i];
				module.taskContainer.setChainDependencies(sequenceChain);

				sequenceChain = sequenceChain.concat(module.taskContainer.getTaskSequence());
			}

			for (var i = 0; i < this.length; i++) {
				var module = this[i];

				module.checkDeps(sequenceChain);
			}

			return this;
		},

		getTasks: function() {
			var tasks = [];

			for (var i = 0; i < this.length; i++) {
				var module = this[i];

				tasks = tasks.concat(module.taskContainer.getTaskSequence());
			}

			return tasks;
		}

	});

	return ModuleContainer;
}();