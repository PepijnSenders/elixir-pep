module.exports = function() {

	var util = require('gulp-util');
	var inquirer = require('inquirer');
	var changeCase = require('change-case');
	var Module = require('../helpers/Module');
	var Notify = require('../helpers/Notify');
	var fs = require('fs');
	var _ = require('underscore');

	return function fire(configFile, done) {
		util.log('Start module creation');

		var questions = [{
			type: 'input',
			name: 'namespace',
			message: 'Namespace'
		}];

		var choices = [];
		for (var i = 0; i < Module.availableMethods.length; i++) {
			var method = Module.availableMethods[i];

			questions.push({
				type: 'confirm',
				name: method,
				message: 'Load ' + changeCase.title(method)
			});
		}

		inquirer.prompt(questions, function(answers) {
			var config = require(configFile);

			if (!config.modules) {
				config.modules = [];
			}

			var namespaces = _.map(config.modules, function(module) {
				return module.namespace;
			});

			if (!!~namespaces.indexOf(answers.namespace)) {
				return Notify.error(new Error(answers.namespace), 'Namespace is already taken');
			}

			var moduleConfig = {
				namespace: answers.namespace
			};

			for (var i = 0; i < Module.availableMethods.length; i++) {
				var method = Module.availableMethods[i];
				moduleConfig[method] = answers[method];
			}

			config.modules.push(moduleConfig);

			fs.writeFile(configFile + '.json', JSON.stringify(config, null, '	'), function(err) {
				if (err) {
					Notify.error(err, 'Error creating config file');
				}
			});
		});
	};

}();