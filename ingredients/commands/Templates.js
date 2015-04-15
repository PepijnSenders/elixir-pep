module.exports = function() {

	var Config = require('../../helpers/Config');
	var Structure = require('../../helpers/Structure');
	var Notify = require('../../helpers/Notify');
	var plugins = require('gulp-load-plugins')();
	var gulp = require('gulp');

	return function createStream(moduleName, templateSource, ingredientConfig) {
		var templateConfig = Config.load('templates', ingredientConfig);
		var pluginConfig = Config.load('plugins', ingredientConfig);

		pluginConfig['angular-templatecache'].module = moduleName;

		return gulp.src(templateSource)
			.pipe(plugins.angularTemplatecache(pluginConfig['angular-templatecache']))
			.pipe(gulp.dest('./'));
	};

}();