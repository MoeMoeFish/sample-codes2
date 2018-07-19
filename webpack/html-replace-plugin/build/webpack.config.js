const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../config')

module.exports = {
    entry: config.entry,
    target: 'web',
    output: {
        path: config.outputPath
    },
    mode: 'development',
    plugins:[
        new HtmlWebpackPlugin({
            template: config.htmlTemplate,
            inject: false,
            mainurl: 'http'
        })
    ]
}