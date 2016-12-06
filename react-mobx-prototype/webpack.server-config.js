// taken from https://gist.github.com/lingz/14ad8ea44998f5009d5d

var Fs = require('fs');
var nodeModules = {};
Fs.readdirSync('node_modules').forEach(function (module) {
	if (module !== '.bin') {
		nodeModules[module] = true;
	}
});
var nodeModulesTransform = function (context, request, callback) {
  // search for a '/' indicating a nested module
	var slashIndex = request.indexOf('/');
	var rootModuleName;
	if (slashIndex == -1) {
		rootModuleName = request;
	} else {
		rootModuleName = request.substr(0, slashIndex);
	}

  // Match for root modules that are in our node_modules
	if (nodeModules.hasOwnProperty(rootModuleName)) {
		callback(null, 'commonjs ' + request);
	} else {
		callback();
	}
};

module.exports = {
	target: 'node',
	entry: './src/server/index.js',
	output: {
		filename: './build/server/server.js'
	},
	externals: nodeModulesTransform,
	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js$/,
			exclude: /node_modules/,
			query: {
	  presets: ['latest']
  }
		}]
	},
	devtool: 'source-map'
};