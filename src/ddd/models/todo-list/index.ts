import {createModelRepo} from '../../utils/model-repo';

import {buildTodoList} from './todo-list';
import {fetchTodoList} from './todo-provider';

export * from './todo-list-types';
export * from './todo-list';
export * from './todo-provider';

export const todoListRepo = createModelRepo(
    fetchTodoList,
    (xs) => buildTodoList(xs.items),
    () => false
);

export type TodoListRepo = typeof todoListRepo;
