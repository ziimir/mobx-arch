import path from 'path';
import express from 'express';
import config from 'config';

import winston from 'winston';
import expressWinston from 'express-winston';

import mainPageTemplate from './views/main.pug';

/* eslint-disable @typescript-eslint/no-var-requires, import/no-unresolved, import/extensions */
const {render} = require('out/server.page.js');
const manifest = require('out/manifest.json');
/* eslint-enable @typescript-eslint/no-var-requires, import/no-unresolved, import/extensions */

const app = express();
const port = 3000;

const rootDir = path.resolve(__dirname, '../../');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface AppAssets {
    js: string[];
    css: string[];
}

function getAssets(): AppAssets {
    const JS_ASSET_NAME_REGEXP = /\.js$/;
    const CSS_ASSET_NAME_REGEXP = /\.css$/;
    const css: string[] = [];
    const js: string[] = [];

    Object.keys(manifest).forEach((assetName) => {
        const assetsPath = manifest[assetName];

        if (JS_ASSET_NAME_REGEXP.test(assetName)) {
            js.push(`${assetsPath}${IS_PRODUCTION ? '.gz' : ''}`);
        }

        if (CSS_ASSET_NAME_REGEXP.test(assetName)) {
            css.push(`${assetsPath}${IS_PRODUCTION ? '.gz' : ''}`);
        }
    });

    return {js, css};
}

const assets = getAssets();

app.use(
    '/assets',
    express.static(
        path.join(rootDir, config.get('build.clientOutput')),
        {
            setHeaders: (response, path) => {
                if (IS_PRODUCTION && (/\.(js|css)\.gz$/i).test(path)) {
                    response.set('Content-Encoding', 'gzip');
                }
            }
        }
    )
);

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    requestWhitelist: [
        'method',
        'url',
        'query'
    ]
}));

app.get('/', (req, res) => {
    res.send(mainPageTemplate({
        js: assets.js,
        css: assets.css,
        title: 'Hey!',
        message: 'Hello there!',
        reactApp: render()
    }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
