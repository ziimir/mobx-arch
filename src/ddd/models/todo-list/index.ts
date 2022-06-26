import {createModelRepo} from '../../utils/model-repo';

import {buildTodoList} from './todo-list';
import {fetchTodo} from './todo-provider';

export * from './todo-list-types';
export * from './todo-list';
export * from './todo-provider';

export const todoListRepo = createModelRepo(
    fetchTodo,
    (xs) => buildTodoList(xs.items)
);

export type TodoListRepo = typeof todoListRepo;
