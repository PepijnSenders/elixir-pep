module.exports = function() {

	var util = require('gulp-util');
	var defaultConfig = require('../default.json');
	var _ = require('underscore');

	var userConfig = {
		production: !!util.env.production
	};

	var Config = {

		baseConfig: function() {
			return _.deepExtend(defaultConfig, userConfig);
		},

		load: function(name, moduleConfig) {
			moduleConfig = typeof moduleConfig === 'undefined' ? {} : moduleConfig;

			var baseConfig = this.baseConfig();
			var configPart = name in baseConfig ? baseConfig[name] : {};

			var result;
			if (_.isObject(configPart)) {
				result = _.deepExtend(configPart, moduleConfig[name]);
			} else {
				result = configPart;
			}

			return _.clone(result);
		},

		setUserConfig: function(config) {
			_.deepExtend(userConfig, config);
		}

	};

	return Config;

}();