import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  entry: 'source/index.jsx',
  dest: 'build/bundle.js',
  format: 'es',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    nodeResolve({
      jsnext: true
    }),
    commonJS({
      namedExports: {
        'node_modules/react/react.js': ['Component'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    buble(),
    serve({
      contentBase: './',
      host: 'localhost',
      port: 8080,
      open: true
    }),
    livereload({
      watch: 'build/bundle.js'
    })
  ]
};
