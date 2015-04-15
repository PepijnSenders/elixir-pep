module.exports = function() {

	var Config = require('../../helpers/Config');
	var Structure = require('../../helpers/Structure');
	var Notify = require('../../helpers/Notify');
	var plugins = require('gulp-load-plugins')();
	var combine = require('stream-combiner2').obj;

	return function createPipeline(stream, ingredientConfig) {
		var sassConfig = Config.load('sass', ingredientConfig);
		var pluginsConfig = Config.load('plugins', ingredientConfig);

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