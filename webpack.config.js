const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        e1: './src/e1',
        vendor: ['negative-zero'],
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.NamedModulesPlugin,
    ],
};
