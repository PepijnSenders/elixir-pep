module.exports = function() {

	var notify = require('gulp-notify');

	var Notify = {

		title: 'Elixir Pep',

		message: function(message) {
			return notify({
				title: this.title,
				message: message,
				onLast: true
			});
		},

		error: function(e, message) {
			notify.onError({
				title: this.title,
				message: message + ': <%= error.message %>'
			})(e);
			console.log(e);
		},

		forPassedTests: function(framework) {
			return notify({
				title: 'Green!',
				message: 'Your ' + framework + ' tests passed!',
				onLast: true
			});
		},

		forFailedTests: function(e, framework) {
			return notify.onError({
				title: 'Red!',
				message: 'Your ' + framework + ' tests failed!'
			})(e);
		}

	};

	return Notify;

}();