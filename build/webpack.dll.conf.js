const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['vue/dist/vue.esm.js', 'lodash', 'vuex', 'axios', 'vue-router', 'iview', 'vue-ls']
    },
    output: {
        path: path.join(__dirname, '../static/js'),
        filename: '[name].dll.js',
        library: '[name]_library' // vendor.dll.js中暴露出的全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};