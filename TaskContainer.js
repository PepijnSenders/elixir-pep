module.exports = function() {

	var TaskContainer = function() {};
	TaskContainer.prototype = new Array();

	Object.merge(TaskContainer.prototype, {

		getTaskSequence: function() {
			var sequence = [];

			for (var i = 0; i < this.length; i++) {
				var task = this[i];

				sequence.push(task.name);
			}

			return sequence;
		},

		setChainDependencies: function(sequenceChain) {
			for (var i = 0; i < this.length; i++) {
				var task = this[i];

				task.dep = task.dep.concat(sequenceChain);
			}
		}

	});

	return TaskContainer;

}();