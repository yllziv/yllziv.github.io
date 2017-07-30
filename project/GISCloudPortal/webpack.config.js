var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

function getEntry() {
  var jsPath = path.resolve(srcDir, 'scripts');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    console.log(matchs);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'scripts', item);
    }
  });
  console.log(JSON.stringify(files));
  return files;
}

module.exports = {
  cache: true,
  devtool: "source-map",
  entry: getEntry(),
  output: {
    path: path.join(__dirname, "dist/scripts/"),
    publicPath: "dist/scripts/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new CommonsChunkPlugin('common.js'),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
