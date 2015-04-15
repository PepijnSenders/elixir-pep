module.exports = function() {

	require('sugar');
	var Config = require('../helpers/Config');
	var Structure = require('../helpers/Structure');
	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')();
	var JSCompiler = require('./commands/JSCompiler');
	var combine = require('stream-combiner2').obj;
	var fs = require('fs');
	var changeCase = require('change-case');
	var Templates = require('./commands/Templates');
	var merge = require('merge-stream');

	return function(module) {
		var taskName = this.getTaskName('angular', module.config);
		var angularConfig = Config.load('angular', module.config);

		var moduleName = require('../helpers/Module').getAppName(angularConfig.name, module.config.namespace);

		angularConfig = Object.merge({
			js: {
				annotate: true,
				bundle: moduleName + '.js'
			}
		}, angularConfig, true);
		var jsConfig = Config.load('js', angularConfig);
		var pluginsConfig = Config.load('plugins', angularConfig);

		var angularSource = angularConfig.src || Structure.sourceFiles.angular(module.config.namespace);
		var templateSource = Structure.sourceFiles.templates(module.config.namespace);

		gulp.task(taskName, function() {
			var stream = merge(
				gulp.src(angularSource)
					.pipe(plugins.filesize())
					.pipe(plugins.if(jsConfig.traceur, plugins.traceur(pluginsConfig['traceur'])))
					.pipe(plugins.if(jsConfig.annotate, plugins.ngAnnotate(pluginsConfig['ng-annotate']))),
				Templates(moduleName, templateSource, module.config)
			)
				.pipe(plugins.if(jsConfig.sourcemaps, plugins.sourcemaps.write('.')))
				.pipe(plugins.if(jsConfig.uglify, plugins.uglify(pluginsConfig['uglify'])));

			if (jsConfig.bundle) {
				stream = stream
					.pipe(plugins.concat(jsConfig.bundle));
			}

			return stream
				.pipe(plugins.filesize())
				.pipe(gulp.dest(Structure.dest.angular(module.config.namespace)));
		});

		var task = gulp.tasks[taskName];
		task.fileDependencies = [angularSource, templateSource].flatten();

		return task;
	};

}();