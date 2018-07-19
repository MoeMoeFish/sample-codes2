const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/hello.js'),
    outputPath: path.resolve(__dirname, '../dist'),
    htmlTemplate: path.resolve(__dirname, '../src/index.html')

}