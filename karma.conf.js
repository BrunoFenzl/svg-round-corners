var webpackConfig = require('./build/webpack.prod.js');
webpackConfig.mode = 'development';

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: ['tests/*.spec.js'],

    preprocessors: {
      'tests/*.spec.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
    },

    browsers: ['Chrome']
  });
};
