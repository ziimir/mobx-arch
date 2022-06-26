import {unwrapDeps} from '../../utils/unwrap-deps';

import {TodoListRepo} from '../../models/todo-list';

export class TodoAggregation {
    deps;

    constructor(todoRepo: TodoListRepo) {
        this.deps = unwrapDeps({todoList: todoRepo});
    }

    get getList() {
        return this.deps.todoList.list;
    }
}
