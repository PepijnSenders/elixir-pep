module.exports = function() {

	var gulp = require('gulp');

	var RestartWatcher = function(configFile) {

		gulp.task('restart', function() {
			console.log('restart');
		});

		gulp.watch(configFile, ['restart']);

	};

	return RestartWatcher;

}();