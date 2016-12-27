const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
    xo: pkg.xo || {},
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        filename: path.resolve(__dirname, 'dist/app.js'),
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: 'xo-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
}
