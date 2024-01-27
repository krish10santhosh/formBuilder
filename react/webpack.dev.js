const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    }
})