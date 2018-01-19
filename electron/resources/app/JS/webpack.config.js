var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/../build',
        filename: 'bundle.js'
    },

    module: {
            loaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.css$/,  loader: 'style-loader!css-loader' },
                { test: /\.html$/, loader: 'raw' },
                { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file-loader' }
            ]
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'Popper': 'popper.js'
        }),
    ]
};