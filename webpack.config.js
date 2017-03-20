var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, 'entry/entry.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js"
  },
  //watch: true,

  module: {
    loaders: [

      {
        test: /\.jade$/,

        loader: "jade-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, "styles"),
        loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
      }

    ]
  },
  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
     // require.context('./locale', true, /en-gb/),
    //new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/,/en-gb/)
  ]
};
