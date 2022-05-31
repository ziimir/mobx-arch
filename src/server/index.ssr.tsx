import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {App} from '../client/app';

export const render = () => ReactDOMServer.renderToString(<App />);
