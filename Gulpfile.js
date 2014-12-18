var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-imagemin');
require('laravel-elixir-browser-sync');

var config = elixir.config;

// Browser Sync
config.developmentDomain = 'dev.example.com';

//Javascript Includes
config.jsApp = [
	'app.js',
];
config.jsVendor = [
	'enquire/dist/enquire.js',
	'filament-sticky/fixedsticky.js',
	'frame-events/frame-events.js',
];
config.jsFoundation = [
	'foundation.js',
];


elixir(function(mix) {
	mix.sass()
		.scripts(config.jsApp,          config.jsAppDir,            config.jsOutput + '/app.js')
		.scripts(config.jsVendor,       config.bowerDir,            config.jsOutput + '/vendor.js')
		.scripts(config.jsFoundation,   config.foundationDir,       config.jsOutput + '/vendor/foundation.js')
		.scripts(config.jsFoundation,   config.foundationLegacyDir, config.jsOutput + '/vendor/foundation-legacy.js')
		.imagemin()
		.browserSync([
			'resources/views/**/*'
		], {
			proxy: config.developmentDomain,
			host: config.developmentDomain,
			ghostMode: false,
			online: true,
			open: "external"
		})
	;
});