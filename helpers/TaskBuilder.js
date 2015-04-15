module.exports = function() {

	var TaskBuilder = {

		getTaskName: function(operation, config) {
			return [config.namespace, operation].join('@');
		},

		sass: require('../ingredients/sass'),
		angular: require('../ingredients/angular'),
		libs: require('../ingredients/libs'),
		'angular-deps': require('../ingredients/angular-deps')

	};

	return TaskBuilder;

}();