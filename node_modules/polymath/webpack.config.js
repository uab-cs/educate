const libraryName = "polymath";
const libraryFileName = libraryName + ".js";

module.exports = {
    entry: {
        "polymath": './src/main.ts'
    },
    resolve: { extensions: ['.js', '.ts'] },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        path: __dirname + '/bundles',
        filename: libraryFileName,
        libraryTarget: "umd",
        library: libraryName,
        umdNamedDefine: true
    }
};