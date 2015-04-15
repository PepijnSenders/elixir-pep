var elixir = require('laravel-elixir');

elixir.extend('pep', function(config) {

	require('./helpers/Pep').init(this, config);

});