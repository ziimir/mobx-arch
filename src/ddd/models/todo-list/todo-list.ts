import {observable, action, makeObservable} from 'mobx';

import {TodoItemDTO, TodoListDTO} from './todo-list-types';

class TodoItem {
    id: number;

    text = '';

    isDone = false;

    constructor(payload: TodoItemDTO) {
        this.id = payload.id;
        this.text = payload.text;
        this.isDone = Boolean(payload.isDone);

        makeObservable(this, {
            text: observable,
            isDone: observable,
            toggleIsDone: action,
            updateText: action
        });
    }

    toggleIsDone = () => {
        this.isDone = !this.isDone;
    };

    updateText = (text: string) => {
        this.text = text;
    };
}

export class TodoList {
    list: TodoItem[] = [];

    constructor(todoList: TodoListDTO) {
        this.list = todoList.map((x) => new TodoItem(x));

        makeObservable(this, {list: observable.shallow});
    }
}

export const buildTodoList = (todoList: TodoListDTO) => new TodoList(todoList);
