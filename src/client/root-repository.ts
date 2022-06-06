import {createModelRepo} from '../ddd/utils/model-repo';

import {buildTodoList} from '../ddd/todo-list/todo-list';
import {fetchTodo} from '../ddd/todo-list/todo-provider';

export const rootRepository = {
    todoList: createModelRepo(
        fetchTodo,
        (xs) => buildTodoList(xs.items)
    )
};

export type RootRepo = typeof rootRepository;
