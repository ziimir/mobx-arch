import {action, observable} from 'mobx';

import {TodoItem} from '../../ddd/todo/todo';

import {TodoListDTO} from './todo-list-types';

export class TodoList {
    @observable.shallow list: TodoItem[] = [];

    constructor(todoList: TodoListDTO) {
        this.list = todoList.map((x) => new TodoItem(x));
    }
}

export const buildTodoList = (todoList: TodoListDTO) => new TodoList(todoList);
