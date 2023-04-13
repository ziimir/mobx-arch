import {injectable, inject} from 'inversify';
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

@injectable()
export class TodoList {
    list: TodoItem[] = [];

    //constructor(todoList: TodoListDTO = [{id: 9, text: 'sadf'}]) {
    constructor() {
        //this.list = todoList.map((x) => new TodoItem(x));

        makeObservable(this, {
            list: observable.shallow,
            add: action
        });
    }

    public init(todoList: TodoListDTO) {
        this.list = todoList.map((x) => new TodoItem(x));
    }

    public add(item: TodoItemDTO) {
        this.list.push(new TodoItem(item));
    }
}

@injectable()
export class TodoListFactory {
    @inject('TodoListConstructor') private TodoList: {new(todoList: TodoListDTO): TodoList};

    public create(todoList: TodoListDTO) {
        return new this.TodoList(todoList);
    }
}
