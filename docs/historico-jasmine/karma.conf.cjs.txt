const fs = require('fs');
const esbuild = require('esbuild');
const { createInstrumenter } = require('istanbul-lib-instrument');

const instrumenter = createInstrumenter({ esModules: true, produceSourceMap: false });

// Plugin: instrumenta el código fuente (no los tests) para medir cobertura
const istanbulPlugin = {
  name: 'istanbul',
  setup(build) {
    build.onLoad({ filter: /src[\\/](components|views|data)[\\/].*\.jsx?$/ }, async (args) => {
      const source = await fs.promises.readFile(args.path, 'utf8');
      const result = await esbuild.transform(source, {
        loader: args.path.endsWith('.jsx') ? 'jsx' : 'js',
        jsx: 'automatic',
        sourcemap: true,
        sourcefile: args.path,
      });
      const code = instrumenter.instrumentSync(
        result.code,
        args.path,
        JSON.parse(result.map)
      );
      return { contents: code, loader: 'js' };
    });
  },
};

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/tests/**/*.spec.js', watched: false }],
    preprocessors: { 'src/tests/**/*.spec.js': ['esbuild'] },
    esbuild: {
      jsx: 'automatic',
      define: { 'process.env.NODE_ENV': '"test"' },
      loader: { '.css': 'empty', '.js': 'jsx' },
      plugins: [istanbulPlugin],
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text' },
      ],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};