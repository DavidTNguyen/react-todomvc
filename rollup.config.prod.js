import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import butternut from 'rollup-plugin-butternut';

export default {
  entry: 'source/index.jsx',
  dest: 'build/bundle.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
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
    butternut()
  ]
};
