import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';

import {MobxContext} from './mobx-context';

import {TodoList} from '../ddd/todo-list';

document.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector('#main');
    ReactDOM.hydrate(
        <MobxContext.Provider value={new TodoList(['one', 'two', 'three'])}>
            <App />
        </MobxContext.Provider>,
        domContainer
    );
});
