const dotenv = require('dotenv');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const child = require('child_process');
const AutoprefixerPlugin = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

dotenv.config();

const {
  BACKEND_URL,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT,
  DEPLOYMENT_URL,
  ALGOD_TOKEN,
  ALGORAND_LEDGER,
  ALGOEXPLORER_URL,
  ALGOEXPLORER_API_URL,
} = process.env;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const mode = process.env.BABEL_ENV;
const isProduction = mode === 'production';

const buildDir = resolveApp('build');
const publicDir = resolveApp('public');
const publicAsset = (file) => resolveApp(`public/${file}`);
const publicPath = '/';

/* eslint-disable no-param-reassign */
/**
 * Creates a map of environment variables, where keys are
 * 'process.env.ENV_VAR', which will be injected in the build sources using Webpack Define plugin
 * @returns {{ string: string }}
 */
const loadEnv = () => {
  // find tag version first. If it does not exist, fallback to use commit hash
  let tag;
  try {
    tag = child.execSync('git describe --tags --exact-match --abbrev=0').toString();
  } catch (e) {
    if (e.message.includes('No names found')) {
      console.log(`↑
Message above means there is no tag for this version. Consider creating one.`);
    } else if (!e.message.includes('no tag exactly matches')) throw e;
  }

  // No git hash, try to find one ourselves
  const hash = child.execSync('git rev-parse --short HEAD').toString();

  return {
    'process.env.GIT_TAG': JSON.stringify(tag ? `${tag} · ${hash}` : hash),
    'process.env.BACKEND_URL': JSON.stringify(BACKEND_URL),
    'process.env.KEYCLOAK_URL': JSON.stringify(`${KEYCLOAK_URL}/auth`),
    'process.env.KEYCLOAK_REALM': JSON.stringify(KEYCLOAK_REALM),
    'process.env.KEYCLOAK_CLIENT': JSON.stringify(KEYCLOAK_CLIENT),
    'process.env.DEPLOYMENT_URL': JSON.stringify(DEPLOYMENT_URL),
    'process.env.ALGOD_TOKEN': JSON.stringify(ALGOD_TOKEN),
    'process.env.ALGORAND_LEDGER': JSON.stringify(ALGORAND_LEDGER),
    'process.env.ALGOEXPLORER_URL': JSON.stringify(ALGOEXPLORER_URL),
    'process.env.ALGOEXPLORER_API_URL': JSON.stringify(ALGOEXPLORER_API_URL),
  };
};

const webpackClient = DEPLOYMENT_URL;

const copyPublic = () => {
  fs.copySync(publicDir, buildDir, {
    dereference: true,
    filter: (file) => file !== publicAsset('index.html'),
  });
};

const asyncConfig = async () => {
  copyPublic();

  return {
    entry: [
      !isProduction && `webpack-dev-server/client?${webpackClient}`,
      './src/index.js',
    ].filter(Boolean),
    mode,
    bail: isProduction, // early exit in production builds on error
    devtool: !isProduction ? 'inline-cheap-source-map' : false,
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/, /\.txt$/],
              loader: 'url-loader',
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                  cacheDirectory: true,
                  cacheCompression: isProduction,
                  compact: isProduction,
                },
              },
            },
            {
              test: /\.[s]css$/,
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
              use: [
              /**
               * style-loader injects the styles as a string directly into the page
               * using <style> tags, whicl mini-css-extract-plugin extracts styles into
               * files and creates chunks
               */
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                      ident: 'postcss',
                      plugins: [
                        AutoprefixerPlugin({
                          add: true, // add prefixes,
                          remove: true, // remove outdated prefixes
                          flexbox: true, // add flexbox support prefixes (we use it in some places)
                        }),
                      ],
                    },
                  },
                },
                {
                  loader: 'resolve-url-loader',
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    sassOptions: {
                      indentWidth: 2,
                      fiber: false,
                    },
                  },
                },
              ].filter(Boolean),
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: 'file-loader',
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        ...(await loadEnv()),
      }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: publicAsset('index.html'),
        filename: 'index.html',
        favicon: publicAsset('favicon.ico'),
        ...(isProduction
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
          : undefined),
      }),
      !isProduction && new webpack.HotModuleReplacementPlugin(),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath,
      }),
      new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
        filename: 'static/css/[name].[hash:8].css',
        chunkFilename: 'static/css/[name].[hash:8].chunk.css',
      }),
      isProduction && new CspHtmlWebpackPlugin({
        'base-uri': "'self'",
        'style-src': ["'self'", 'https: fonts.googleapis.com', "'unsafe-inline'"],
        'font-src': ["'self'", 'https: fonts.googleapis.com'],
        'connect-src': [`${KEYCLOAK_URL}`, `${BACKEND_URL}`, "*"],
        'object-src': ["'self'", 'blob:', "'unsafe-inline'", "blob:"],
        'img-src': ['data:', "'self'", "'unsafe-inline'", "*", "blob:"],
      }, {
        hashEnabled: {
          'script-src': true,
          'style-src': true,
          'font-src': true,
          'object-src': true,
          'img-src': true,
        },
        nonceEnabled: {
          'style-src': false,
        },
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: !isProduction ? {
        'react-dom': '@hot-loader/react-dom',
      } : {},
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new OptimizeCssPlugin(),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: false,
        maxInitialRequests: 6,
        maxSize: 10000000,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            minChunks: 3,
          },
          shards: {
            name: 'shards',
            test: /[\\/]shards-react[\\/]/,
            chunks: 'all',
          },
          ta: {
            test: /[\\/]src\/views\/TA[\\/]/,
            chunks: 'all',
          },
          company: {
            test: /[\\/]src\/views\/Company[\\/]/,
            chunks: 'all',
          },
        },
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      compress: false,
      disableHostCheck: true,
      publicPath,
      contentBase: publicDir,
      watchContentBase: true,
      port: process.env.PORT || 9000,
      host: '127.0.0.1',
      hot: true,
      injectHot: true,
      injectClient: true,
      historyApiFallback: true,
      open: true,
      serveIndex: true,
      liveReload: true,
      allowedHosts: [
        '127.0.0.1',
        '.matchfund.app',
      ],
    },
    node: {
      fs: 'empty',
    },
    output: {
      path: buildDir,
      pathinfo: !isProduction,
      publicPath,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isProduction
        ? 'static/js/[name].[hash:8].js'
        : 'static/js/[name].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isProduction
        ? 'static/js/[name].[hash:8].chunk.js'
        : 'static/js/[name].chunk.js',
    },
  };
};

module.exports = asyncConfig;
