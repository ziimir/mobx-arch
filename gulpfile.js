const {exec} = require('child_process');
const path = require('path');
const {series} = require('gulp');
const webpack = require('webpack');
const nodemon = require('nodemon');

const {rootDir} = require('./tools/utils');

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        } else {
            console.log(
                stats.toString({
                    colors: true,
                    all: false,
                    modules: true,
                    entrypoints: true,
                    maxModules: 0,
                    errors: true,
                    errorDetails: true,
                    warnings: true,
                    logging: 'warn'
                })
            );
        }

        done();
    }
}

const watch = (configType) => (done) => {
    let config;

    switch (configType) {
        case 'client':
            config = require('./webpack.client');
            break;

        case 'ssr':
            config = require('./webpack.ssr');
            break;

        case 'server':
            config = require('./webpack.server');
            break;

        default:
            throw new Error('Unknown config');
    }

    webpack(config).watch(100, onBuild(done));
}

const watchClient = watch('client');
watchClient.displayName = 'watchClient';

const watchSsr = watch('ssr');
watchSsr.displayName = 'watchSsr';

const watchServer = watch('server');
watchServer.displayName = 'watchServer';

const runServer = (done) => {
    nodemon({
        script: 'out/server.js',
        watch: [
            'out/assets',
            'out/server.js',
            'out/server.page.js'
        ],
        env: {'NODE_ENV': 'development'},
        done: done
    });
}

const clear = (done) => {
    const buildDir = path.resolve(rootDir, 'out');

    exec(`rm -rf ${buildDir}`, (error) => {
        done(error);
    });
}

module.exports = {
    dev: series(
        clear,
        watchClient,
        watchSsr,
        watchServer,
        runServer
    )
};
