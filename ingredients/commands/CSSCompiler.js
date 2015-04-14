module.exports = function() {

	var Config = require('../../Config');
	var Structure = require('../../Structure');
	var Notify = require('../../Notify');
	var plugins = require('gulp-load-plugins')();
	var combine = require('stream-combiner2').obj;

	return function createPipeline(stream, moduleConfig) {
		var sassConfig = Config.load('sass', moduleConfig);
		var pluginsConfig = Config.load('plugins', moduleConfig);

		return stream
			.pipe(plugins.plumber())
			.pipe(plugins.autoprefixer(pluginsConfig['autoprefixer']))
			.pipe(plugins.if(
				sassConfig.minify || Config.load('production'),
				plugins.minifyCss(pluginsConfig['minify-css'])
			))
			.pipe(plugins.if(sassConfig.sourcemaps, plugins.sourcemaps.write('.')))
			.pipe(plugins.plumber.stop())
			.on('error', Notify.error);
	};

}();