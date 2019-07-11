const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = ({ host, port, hot } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    hot,
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.babelLoader = ({ exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()]
  }
});

exports.loadSVG = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(svg)$/,
        include,
        exclude,
        use: {
          loader: 'svg-url-loader',
          options: {
            noquotes: true,
            ...options
          }
        }
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options = {} } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});

exports.fontLoader = ({ include, exclude, options = {} } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include,
        use: [
          {
            loader: 'file-loader',
            options
          }
        ]
      }
    ]
  }
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])]
});
