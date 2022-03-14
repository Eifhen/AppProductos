const HtmlWebpack =              require('html-webpack-plugin');
const MiniCssExtractPlugin =     require('mini-css-extract-plugin');
const CopyFilePlugin =           require('copy-webpack-plugin');

const CssMinimizer =             require('css-minimizer-webpack-plugin');
const Terser =                   require('terser-webpack-plugin');


// configuraciones de WebPack
module.exports = {

    mode: "production",

    output:{
        clean:true,
        publicPath: "/",
        filename: 'main.[contenthash].js'
    },
    
    devServer: {
        historyApiFallback:true
    },

    module: {
        rules:[

            // Load HTML SPA
            {
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    sources:false
                }
            },

            // Load Css
            {
                test:/\.css$/,
                exclude:/styles.css$/,
                use:['style-loader','css-loader'],
            },

            // Minify Css
            {
                test:/styles.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },

            // File Loader
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'file-loader'
            },

            // Babel Rule
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins:[
        new HtmlWebpack({
            title: "Mi WebPack App",
            filename: 'index.html',
            template: './src/index.html'
        }),
        
        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),
        
        // new CopyFilePlugin({
        //     patterns:[
        //         {from: 'src/assets/', to: 'assets/'}
        //     ]
        // })
    ]
}