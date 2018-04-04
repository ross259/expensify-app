const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const outputPath = path.join(__dirname, 'public', 'dist');

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
      CSSExtract
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


