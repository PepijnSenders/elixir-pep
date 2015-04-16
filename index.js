var elixir = require('laravel-elixir');

console.log('aap');
elixir.extend('pep', function(config) {

	require('./helpers/Pep').init(this, config);

	console.log(elixir.config);

});