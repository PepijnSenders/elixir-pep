module.exports = function() {

	require('sugar');
	var util = require('gulp-util');
	var defaultConfig = require('../default.json');

	var userConfig = {
		production: !!util.env.production
	};

	var Config = {

		baseConfig: function() {
			return Object.merge(defaultConfig, userConfig, true);
		},

		load: function(name, moduleConfig) {
			moduleConfig = typeof moduleConfig === 'undefined' ? {} : moduleConfig;

			var baseConfig = this.baseConfig();
			var configPart = name in baseConfig ? baseConfig[name] : {};

			var result;
			if (Object.isObject(configPart)) {
				result = Object.merge(configPart, moduleConfig[name], true);
			} else {
				result = configPart;
			}

			return Object.clone(result);
		},

		setUserConfig: function(config) {
			Object.merge(userConfig, config);
		}

	};

	return Config;

}();