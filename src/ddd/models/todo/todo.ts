import {observable, action, makeObservable} from 'mobx';

import {TodoDTO} from './todo-types';

export class Todo {
    id: number;

    text: string;

    description: string;

    isDone: boolean;

    constructor(payload: TodoDTO) {
        this.id = payload.id;
        this.text = payload.text;
        this.description = payload.description;
        this.isDone = Boolean(payload.isDone);

        makeObservable(this, {
            text: observable,
            description: observable,
            isDone: observable,
            toggleIsDone: action,
            updateText: action,
            updateDescription: action
        })
    }

    toggleIsDone = () => {
        this.isDone = !this.isDone;
    };

    updateText = (text: string) => {
        this.text = text;
    };

    updateDescription = (text: string) => {
        this.description = text;
    }
}
