'use strict';

const presets = [['@babel/preset-env', {loose: true}], '@babel/preset-react', '@babel/preset-flow'];
const plugins = [['@babel/plugin-proposal-class-properties', {loose: true}]];

if (process.env['BABEL_ENV'] === 'esm') {
    presets[0] = [
        '@babel/preset-env',
        {
            loose: true,
            modules: false,
        },
    ];
}

if (process.env['BABEL_ENV'] === 'esm' || process.env['BABEL_ENV'] === 'cjs') {
    plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {presets, plugins};
