const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: path.resolve(__dirname, 'lib/debug.js'),
            options: {
              pretty: true,
            }
          },
          // {
          //   loader: 'extract-loader',
          // },
          // {
          //   loader: 'html-loader',
          // },
          // {
          //   loader: 'pug-html-loader',
          // },
          {
            loader: 'apply-loader',
          },
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: path.resolve(__dirname, 'lib/debug.js'),
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
};
