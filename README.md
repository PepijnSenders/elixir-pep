# elixir-pep

All around tool for compiling modules from elixir and a config file that when changed will automatically refresh the stream.

Currently supported compilers:
- Angular (with templateCache included)
- SASS
- Scripts

### Installation

```npm install --save-dev gulp-util elixir-pep```

Require the package in your gulpfile.js and add the pep function to the mix object of elixir. (Remember you can still use elixir's own functions with this command.)

Example gulpfile:
```
var util = require('gulp-util');

var machine = require('elixir-pep');

machine.start(__dirname + '/' + (util.env.config || 'config'), function(mix) {
	// Normal elixir functions
});
```

### Exceptions

Reserved namespaces are: console.

### Console tool

There a couple of built-in tools to improve work speed.

- gulp console@create-module
	- Will create a module in your config file

### Configuration

As you can see in the previous example the pep function requires only ONE argument and this is the config in the form of an object.

Example configuration:

```
{
	"modules": [{
		"namespace": "demo",
		"angular": {
			"deps": ["LocalStorageModule"]
		},
		"libs": {
			"src": ["resources/assets/bower/angular/angular.js"]
		},
		"sass": true
	}, {
		"namespace": "LocalStorageModule",
		"angular": {
			"name": "LocalStorageModule",
			"src": "resources/assets/bower/angular-local-storage/dist/angular-local-storage.js"
		}
	}]
}
```

I have defined two modules here, as you can probably see a lot of stuff is predefined, but also very extensible!
You can edit all the different configurations of all different modules by calling the plugins parameter in the config file, like so:

```
"plugins": {
	"angular-templatecache": {
		"root": "templates/"
	}
}
```

If you only want this for a module, you can put it into the config object of that module, this will cascade down in the configuration and overwrite the properties that you define here.
You can also just create the folders itsself and define a module and its namespace and the module will think of the rest itself.

### Running tasks

To run seperate tasks you can execute ```gulp {module}@{namespace}```, so for example you can run: ```gulp demo@angular``` and this will run only the angular task of the demo module.

### Structure

The recommended structure for this module is something like:

```
resources/assets/modules/{namespace}/sass
resources/assets/modules/{namespace}/angular
resources/assets/modules/{namespace}/templates
resources/assets/modules/{namespace}/libs
```

You can edit this structure entirely in the structure config (scroll down for a view of the entire config file).

### Angular

To append dependencies to your angular apps, you can add the deps parameter to your module's angular config. This will go through your modules and find the coherent namespaces, it will append the found files to a deps file in the angular dist folder.

### Walktrough

To create a module you could go through the following steps:

1. Open the config.json file (if it's not in your root folder yet, create an empty one)
2. Add an object to the modules array in the root object of the config.json file
3. Create a namespace key in this module object, for example for the demo namespace:

```
{
	"modules": [{
		"namespace": "demo"
	}]
}
```

4. This is practically enough for a basic setup, if you have your folder structure ordered as the Structure configuration. So if you have a sass folder in your namespace, sass will compile to css in the public dist folder.
5. You can add any of the different compile methods (currently: sass, angular and/or libs) to the module config with different plugin configuration and the files to compile added to the ```src``` key.

### Options

```
{
	"modules": [],
	"structure": {
		"source": {
			"basePath": "./resources/assets/modules",
			"sass": "sass",
			"angular": "angular",
			"templates": "templates",
			"libs": "libs"
		},
		"dest": {
			"basePath": "./public/dist",
			"sass": "css",
			"angular": "angular",
			"libs": "libs"
		}
	},
	"sass": {
		"sourcemaps": true,
		"minify": false
	},
	"js": {
		"bundle": false,
		"traceur": true,
		"sourcemaps": true,
		"uglify": false,
		"annotate": false,
		"filesize": false
	},
	"plugins": {
		"angular-templatecache": {
			"root": "",
			"module": "templates",
			"standalone": false,
			"moduleSystem": "",
			"templateHeader": "angular.module(\"<%= module %>\"<%= standalone %>).run([\"$templateCache\", function($templateCache) {",
			"templateFooter": "}]);"
		},
		"uglify": {
			"mangle": true,
			"output": {
				"indent_start": 0,
				"indent_level": 4,
				"quote_keys": false,
				"space_colon": true,
				"ascii_only": false,
				"inline_script": false,
				"width": 80,
				"max_line_len": 32000,
				"ie_proof": true,
				"beautify": false,
				"source_map": null,
				"bracketize": false,
				"comments": false,
				"semicolons": true
			},
			"compress": {
				"sequences": true,
				"properties": true,
				"dead_code": true,
				"drop_debugger": true,
				"unsafe": false,
				"conditionals": true,
				"comparisons": true,
				"evaluate": true,
				"booleans": true,
				"loops": true,
				"unused": true,
				"hoist_funs": true,
				"hoist_vars": false,
				"if_return": true,
				"join_vars": true,
				"cascade": true,
				"side_effects": true,
				"warnings": true,
				"global_defs": {}
			}
		},
		"traceur": {
			"modules": "commonjs"
		},
		"ng-annotate": {
			"remove": true,
			"add": true,
			"single_quotes": true
		},
		"autoprefixer": {
			"browsers": [
				"> 1%",
				"last 2 versions",
				"Firefox ESR",
				"Opera 12.1"
			],
			"cascade": true,
			"remove": true
		},
		"minify-css": {
			"advanced": false,
			"aggressiveMerging": false,
			"benchmark": false,
			"compatibility": false,
			"debug": true,
			"inliner": false,
			"keepBreaks": false,
			"keepSpecialComments": "*",
			"mediaMerging": true,
			"processImport": false,
			"rebase": false,
			"relativeTo": false,
			"restructuring": false,
			"root": false,
			"roundingPrecision": 2,
			"shorthandCompacting": false,
			"sourceMap": false,
			"sourceMapInlineSources": false,
			"target": false
		}
	}
}
```