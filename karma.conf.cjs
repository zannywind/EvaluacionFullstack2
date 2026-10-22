module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [{ pattern: 'src/tests/**/*.spec.js', watched: false }],
        preprocessors: { 'src/tests/**/*.spec.js': ['esbuild'] },
        esbuild: {
            jsx: 'automatic',
            define: { 'process.env.NODE_ENV': '"test"' },
            loader: { '.css': 'empty', '.js': 'jsx' },
            },
        reporters: ['progress'],
        browsers: ['ChromeHeadless'],
        singleRun: true,
    })
}