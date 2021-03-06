const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/client/js',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
           {
               test:  /\.js$/,
               exclude: /node_module/,
               use: {
                loader: 'babel-loader'
              }
           },
           {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader",
            ],
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "./src/client/assets", to: "assets" },
            ],
        }),
    ]
}