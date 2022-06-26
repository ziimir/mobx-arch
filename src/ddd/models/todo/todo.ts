import {observable, action} from 'mobx';

import {TodoDTO} from './todo-types';

export class TodoItem {
    id: string;

    @observable text = '';

    @observable isDone = false;

    constructor(payload: TodoDTO) {
        this.id = payload.id;
        this.text = payload.text;
        this.isDone = Boolean(payload.isDone);
    }

    @action toggleIsDone = () => {
        this.isDone = !this.isDone;
    };

    @action updateText = (text: string) => {
        this.text = text;
    };
}
