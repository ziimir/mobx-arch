import {makeAutoObservable} from 'mobx';

import {rootRepository} from '../../root-repository';
import {TodoList} from '../../../ddd/todo-list/todo-list';

class TodoListController {
    private _todoListRepo = rootRepository.todoList;

    constructor() {
        makeAutoObservable(this);
    }

    get list(){
        // тут важно ссылаться именно на обзервабл, вот валью - это обзервабл совойсво в ModelContainer
        return this._todoListRepo.get();
    }

    loadData() {
        setTimeout(() => {
            this._todoListRepo.fetch('00000000', 10)
                .then(() => console.log('2 atempt'));
        }, 2000);

        return this._todoListRepo.fetch('111', 10)
            .then(() => {console.log('then', this.list)})
            .then(() => {console.log('then', this.list.list)});
    }
}

export const todoListScene = new TodoListController();
