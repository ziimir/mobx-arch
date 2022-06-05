const clientConfig = require('./webpack.client');
const ssrConfig = require('./webpack.ssr');
const serverConfig = require('./webpack.server');

module.exports = [clientConfig, ssrConfig, serverConfig];
