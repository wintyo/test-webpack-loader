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
            loader: path.resolve(__dirname, 'lib/loader.js'),
            options: {
              pretty: true,
            }
          },
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
