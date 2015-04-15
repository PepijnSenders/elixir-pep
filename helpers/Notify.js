module.exports = function() {

	var notify = require('gulp-notify');

	var Notify = {

		title: 'Laravel Elixir',

		message: function(message) {
			return notify({
				title: this.title,
				message: message,
				icon: __dirname + '/../../icons/laravel.png',
				onLast: true
			});
		},

		error: function(e, message) {
			notify.onError({
				title: this.title,
				message: message + ': <%= error.message %>',
				icon: __dirname + '/../../icons/fail.png'
			})(e);
			console.log(e);
		},

		forPassedTests: function(framework) {
			return notify({
				title: 'Green!',
				message: 'Your ' + framework + ' tests passed!',
				icon: __dirname + '/../../icons/pass.png',
				onLast: true
			});
		},

		forFailedTests: function(e, framework) {
			return notify.onError({
				title: 'Red!',
				message: 'Your ' + framework + ' tests failed!',
				icon: __dirname + '/../../icons/fail.png'
			})(e);
		}

	};

	return Notify;
}();