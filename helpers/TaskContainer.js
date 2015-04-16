module.exports = function() {

	var _ = require('underscore');

	var TaskContainer = function() {};
	TaskContainer.prototype = new Array();

	_.extend(TaskContainer.prototype, {

		getTaskSequence: function() {
			var sequence = [];

			for (var i = 0; i < this.length; i++) {
				var task = this[i];

				sequence.push(task.name);
			}

			return sequence;
		},

		setChainDependencies: function(sequenceChain) {}

	});

	return TaskContainer;

}();