const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  style: path.join(__dirname, 'src', 'styles')
};

const commonConfig = merge({
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Ça pass' où",
      template: path.join(__dirname, './src/public/index.html')
    })
  ]
});

const productionConfig = merge(
  parts.babelLoader({ exclude: /node_modules/ }),
  parts.loadCSS(),
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      },
      parts.autoprefix(),
      'sass-loader'
    ]
  }),
  parts.loadSVG(),
  parts.loadImages(),
  parts.fontLoader(),
  parts.clean(PATHS.build),
  {
    optimization: {
      splitChunks: {
        chunks: 'initial'
      }
    }
  }
);

const developmentConfig = merge(
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    hot: true
  }),
  parts.babelLoader({ exclude: /node_modules/ }),
  parts.fontLoader(),
  parts.loadCSS(),
  parts.loadSVG(),
  parts.loadImages(),
  { plugins: [new webpack.HotModuleReplacementPlugin()] }
);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};
