// -*- coding: utf-8 -*-
import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

export default {
    cache: DEBUG,
    debug: DEBUG,
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: DEBUG,
        cachedAssets: DEBUG,
    },
    entry: {
        'index': ['./src/js/index.js'],
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
            },
        ],
    }
}
