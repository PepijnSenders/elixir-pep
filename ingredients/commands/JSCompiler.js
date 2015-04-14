module.exports = function() {

	var Config = require('../../Config');
	var Structure = require('../../Structure');
	var Notify = require('../../Notify');
	var plugins = require('gulp-load-plugins')();
	var combine = require('stream-combiner2').obj;

	return function createPipeline(stream, moduleConfig) {
		var jsConfig = Config.load('js', moduleConfig);
		var pluginsConfig = Config.load('plugins', moduleConfig);

		stream
			.pipe(plugins.plumber({
				errorHandler: Notify.error
			}));

		stream
			.pipe(plugins.if(jsConfig.traceur, plugins.traceur(pluginsConfig['traceur'])))
			.pipe(plugins.if(jsConfig.annotate, plugins.ngAnnotate(pluginsConfig['ng-annotate'])))
			.pipe(plugins.if(jsConfig.uglify, plugins.uglify(pluginsConfig['uglify'])))
			.pipe(plugins.if(jsConfig.sourcemaps, plugins.sourcemaps.write('.')));

		if (jsConfig.bundle) {
			stream = stream
				.pipe(plugins.concat(jsConfig.bundle));
		}

		return stream;
	};

}();