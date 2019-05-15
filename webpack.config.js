const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

module.exports = [
  {
    entry: {
      app: [
        './src/js/app.js',
        './src/sass/style.scss',
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'js/app.js',
    },
    devServer: {
      contentBase: './dist',
      watchContentBase: true,
      port: 3000,
      open: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
          },
        },
        {
          test: /\.scss$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                AutoPrefixer(
                  {
                    browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
                  },
                ),
              ],
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }],
        },
      ],
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin(),
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
    ],
  },
];