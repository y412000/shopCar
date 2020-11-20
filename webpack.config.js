const path = require('path');
const terserPlugin = require("terser-webpack-plugin"); // minify js
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  // minify css
const htmlWebpackPlugin = require('html-webpack-plugin'); // 把相關的 JS, CSS 路徑自動引入寫進 HTML 頁面的標籤裡 (<script>, <link>)
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 將 CSS 抽離存成檔案再做引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 可自動刪除指定的路徑位址

module.exports = {
    mode: 'development', // production 
    entry: './src/js/main.js',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist') // __dirname 為當前此檔案的絕對路徑
    },
    plugins: [ // 放置輔助套件
        new htmlWebpackPlugin({ // 把相關的 JS, CSS 路徑自動引入寫進 HTML
            template: 'src/index.html',
            // hash: true,
            // minify: true // mode === 'production' ? true : false
        }),
        new CleanWebpackPlugin({ // 可自動刪除指定的路徑位址
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new MiniCssExtractPlugin({ // 將 CSS 抽離存成檔案再做引入
            filename: 'css/[name].css'
        }),
    ],
    optimization: { // 放置優化的套件
        // minimize: true,  // mode === 'production' ? true : false
        minimizer: [
            new terserPlugin(), // minify js
            new optimizeCSSAssetsPlugin(), // minify css

        ]
    },
    module: { // 放置解析與轉譯之類的工具
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [  // 執行順序由下往上，SCSS 轉譯  -> 加入 autoprefixer -> 解析純 CSS -> 分離 CSS 檔案
                    MiniCssExtractPlugin.loader, // 將 CSS 抽離存成檔案再做引入
                    'css-loader', // 可在 JS 中被 import 所解析，還能解析 @import、url()
                    'postcss-loader',
                    'sass-loader', // 將 SASS / SCSS 進行編譯// 自動增加前綴詞
                ]
            },
        ]
    }
}