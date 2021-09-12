const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/js',
    mode: 'development',
    module: {
        rules: [
           {
               test:  /\.js$/,
               exclude: /node_module/,
               use: {
                loader: 'babel-loader'
              }
           } 
        ]
    }, 
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
    ]
 
}