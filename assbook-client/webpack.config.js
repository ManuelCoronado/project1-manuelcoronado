const path = require('path');

module.exports = {
    context: path.join(__dirname, './src'),
    devtool: 'source-map',
    entry: {
        index: './index',
        'add-post': './add-post',
        login: './login',
        register: './register',
        profile: './profile',
        'edit-profile': './edit-profile',
        'post-details': './post-details',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname + '/dist')
    },
    module: {
        rules: [
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                }],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "commons",
                    minChunks: 2,
                    minSize: 0
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        contentBase: __dirname,
        publicPath: '/dist/',
        compress: true,
        port: 8080
    }
}

