const path = require('path');

module.exports = {
    entry: './es/src/Polynomial',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './es/dist'),
        library: 'Polynomial'
    }
};