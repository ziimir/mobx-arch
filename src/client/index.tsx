import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';

document.addEventListener('DOMContentLoaded', () => {
    const domContainer = document.querySelector('#main');
    ReactDOM.hydrate(<App />, domContainer);
});
