// import required modules
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'production' : 'development',   // The default mode is production. development mode can help optimize performance.
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: path.join(__dirname, 'src', 'index.js'),   // The entry point indicates which module webpack should use to begin building out its internal dependency graph. The default is './src/index.js'.
    output: {   // Where to emit the bundles.
      path: path.resolve(__dirname, 'dist'),   // The directory to put assets after bundling. '/dist' is the default.
      filename: 'bundle.js',   // The filename of bundled file
      assetModuleFilename: 'img/[name][ext]',
      publicPath: '/'
    },
    devServer: {
      port: 3000,   // Specify a port to run on
      static: {
        directory: path.join(__dirname, 'dist'),
        watch: false,
      },
      open: true,   // Open the browser after server had been started
      hot: true,   // Enable webpack's Hot Module Replacement(HMR) feature. When re-build the code after changing, the new bundled code replace the old code on the browser without refresh the browser.
    },
    module: {
      // 'test' attribute let webpack know which file type should be transformed.
      // 'use' attribute tells webpack what loaders should be used.
      rules: [
        {
          test: /\.m?js$/,  // Monitor the filename end with js.
          exclude: /(node_modules|bower_components)/,   // Prevent transform every js file in node_modules.
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,   // Monitor the filename end with css.
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      // Specify a file to be the template which is the target that webpack inject assets automatically.
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),   // This is the default.
      }),
      new MiniCssExtractPlugin(),   // Create a mini-css-extract-plugin instance.
      new Dotenv()
    ],
  }
};
