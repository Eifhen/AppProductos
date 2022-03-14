
const HtmlWebpack =              require('html-webpack-plugin');
const MiniCssExtractPlugin =     require('mini-css-extract-plugin');
const CopyFilePlugin =           require('copy-webpack-plugin');

// configuraciones de WebPack
module.exports = {

    mode: "development",

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
            {
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    sources:false
                }
            },
            {
                test:/\.css$/,
                exclude:/styles.css$/,
                use:['style-loader','css-loader'],
            },
            {
                test:/styles.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'file-loader'
            }
        ]
    },

    optimization:{},

    plugins:[
        new HtmlWebpack({
            title: "Mi WebPack App",
            filename: 'index.html',
            template: './src/index.html'
        }),
        
        new MiniCssExtractPlugin({
            filename:'[name].css',
            ignoreOrder:false
        }),
        
        // new CopyFilePlugin({
        //     patterns:[
        //         {from: 'src/assets/', to: 'assets/'}
        //     ]
        // })
    ]
}