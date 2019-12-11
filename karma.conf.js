var webpackConfig = require('./build/webpack.prod.js')

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'lib/*.spec.js'
    ],

    preprocessors: {
      'lib/*.spec.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    browsers: ['ChromeHeadless'],
  })
}