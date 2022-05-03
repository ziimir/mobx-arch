import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {App} from '../client/app';

import {MobxContext} from '../client/mobx-context';

import {TodoList} from '../ddd/todo-list';

export const render = () => ReactDOMServer.renderToString(
    <MobxContext.Provider value={new TodoList(['1', '2', '3'])}>
        <App />
    </MobxContext.Provider>
);
