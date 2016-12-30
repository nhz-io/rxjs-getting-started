const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
    xo: pkg.xo || {},
    entry: './src/main.js',
    output: {
        path: 'dist',
        filename: 'app.js',
        devtoolLineToLine: true,
    },
    devtool: '#eval',
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([{
            from: 'data',
            to: 'data',
        }]),
    ],
}
