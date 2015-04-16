module.exports = function() {

	var fs = require('fs');
	var path = require('path');
	var Pep = require('./Pep');

	var RestartWatcher = function(code, configFile) {

		if (!path.extname(configFile)) {
			configFile = configFile + '.json';
		}

		fs.watchFile(configFile, function() {
			process.exit(code);
		});

	};

	return RestartWatcher;

}();