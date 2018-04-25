const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const outputPath = path.join(__dirname, 'public', 'dist');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test'){
  require('dotenv').config({path: '.env.test'});
}else if (process.env.NODE_ENV === 'development'){
  require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {

  const production = env === 'production';
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: './src/app.js',
    output: {
      path: outputPath,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          // use: ['style-loader', 'css-loader', 'sass-loader'],
          use: CSSExtract.extract({
            use:[
              {loader:'css-loader', options:{sourceMap:true}},
              {loader:'sass-loader', options:{sourceMap:true}}
            ]
          }),
          test: /\.s?css$/
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.API_URL': JSON.stringify(process.env.API_URL)
      })
    ],
    devtool: production ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 9000,
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
};


