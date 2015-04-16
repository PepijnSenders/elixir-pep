module.exports = function() {

	var fs = require('fs');

	var RestartWatcher = function(configFile) {

		fs.watchFile(configFile, function(curr, prev) {
			console.log(arguments);
		});

	};

	return RestartWatcher;

}();