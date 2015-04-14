module.exports = function() {

	var fs = require('fs');
	var TaskContainer = require('./TaskContainer');
	var TaskBuilder = require('./TaskBuilder');
	var Structure = require('./Structure');

	var Module = function(config) {
		this.config = config;
		this.taskContainer = new TaskContainer();
	};

	Object.merge(Module.prototype, {

		availableMethods: [
			'sass',
			'angular',
			'libs'
		],

		build: function() {
			for (var i = 0; i < this.availableMethods.length; i++) {
				var method = this.availableMethods[i];

				if (this.config[method] || fs.existsSync(Structure.source[method](this.config.namespace))) {
					this.taskContainer.push(TaskBuilder[method](this.config));
				}
			}
		},

		checkDeps: function(sequenceChain) {
			if (this.config.angular && this.config.angular.deps) {
				this.taskContainer.push(TaskBuilder['angular-deps'](this.config, sequenceChain));
			}
		}

	});

	return Module;

}();