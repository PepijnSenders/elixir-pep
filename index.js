module.exports = function() {

	var _ = require('underscore');
	var underscoreDeepExtend = require('underscore-deep-extend');

	_.mixin({deepExtend: underscoreDeepExtend(_)});

	var elixir = require('laravel-elixir');
	var cluster = require('cluster');
	var numCPUs = require('os').cpus().length;
	var util = require('gulp-util');
	var gulp = require('gulp');
	var RestartWatcher = require('./helpers/RestartWatcher');
	var Loader = require('./console/Loader');

	var Machine = {
		RESTART_CODE: 304981814,
		start: function(configFile, cb) {
			if (numCPUs <= 1) {
				util.log(util.colors.red('Only one CPU is supported on this machine, auto restarting is not possible!'));
			} else {

				if (process.argv.length >= 3 && process.argv[2].match(/^console\@/)) {
					this.console(configFile);
				} else {
					if (cluster.isMaster) {
						util.log = util.noop;
						cluster.fork();

						cluster.on('exit', function(worker, code) {
							if (code === Machine.RESTART_CODE) {
								cluster.fork();
							}
						});
						// Hacky code coming up (trick gulp)
						elixir(function(mix) {});
						gulp.task('default', function() {});
					} else {
						this.init(configFile);

						elixir(function(mix) {
							mix.pep();
							cb(mix);
						});

						new RestartWatcher(this.RESTART_CODE, configFile);
					}
				}

			}
		},

		init: function(configFile) {
			elixir.extend('pep', function() {

				require('./helpers/Pep').init(configFile);

			});
		},

		console: function(configFile) {
			var loader = new Loader(configFile);
			loader.plug();
		}
	};

	return Machine;

}();