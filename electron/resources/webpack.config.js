module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },

    module: {
            loaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
    },

    resolve: {
        extensions: ['.js']
    }
};
  