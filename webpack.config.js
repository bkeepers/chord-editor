const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: [
      './assets/js/index.js',
      './assets/css/index.css',
    ],
    song: [
      './assets/css/song.css',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }
      },
      {
        test:/\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { implementation: require('sass') } }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './views/song.html',
      filename: 'song.html',
      chunks: ['song']
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    contentBase: "./public"
  },
  mode: 'development',
};
