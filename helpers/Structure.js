module.exports = function() {

	var Config = require('./Config');

	var Structure = {

		getConfig: function() {
			return Config.load('structure');
		},

		source: {
			sass: function(namespace) {
				return [Structure.getConfig().source.basePath, namespace, Structure.getConfig().source.sass].join('/');
			},

			angular: function(namespace) {
				return [Structure.getConfig().source.basePath, namespace, Structure.getConfig().source.angular].join('/');
			},

			templates: function(namespace) {
				return [Structure.getConfig().source.basePath, namespace, Structure.getConfig().source.templates].join('/');
			},

			libs: function(namespace) {
				return [Structure.getConfig().source.basePath, namespace, Structure.getConfig().source.libs].join('/');
			}
		},

		sourceFiles: {
			sass: function(namespace) {
				return Structure.source.sass(namespace) + '/**/*.{scss,sass}';
			},

			angular: function(namespace) {
				return [
					Structure.source.angular(namespace) + '/app.js',
					Structure.source.angular(namespace) + '/config.js',
					Structure.source.angular(namespace) + '/**/*.js'
				];
			},

			templates: function(namespace) {
				return [
					Structure.source.templates(namespace) + '/**/*.html'
				];
			},

			libs: function(namespace) {
				return Structure.source.libs(namespace) + '/**/*.js';
			}
		},

		dest: {
			sass: function(namespace) {
				return [Structure.getConfig().dest.basePath, namespace, Structure.getConfig().dest.sass].join('/');
			},

			angular: function(namespace) {
				return [Structure.getConfig().dest.basePath, namespace, Structure.getConfig().dest.angular].join('/');
			},

			libs: function(namespace) {
				return [Structure.getConfig().dest.basePath, namespace, Structure.getConfig().dest.libs].join('/');
			}
		}

	};

	return Structure;

}();