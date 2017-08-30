const path = require('path');

module.exports = {
    entry: './es/src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './es/dist')
    }
};