import {createModelRepo} from '../../utils/model-repo';

import {buildTodo} from './todo';
import {fetchTodo} from './todo-provider';

export * from './todo-types';
export * from './todo';
export * from './todo-provider';

export const todoRepo = createModelRepo(
    fetchTodo,
    (x) => buildTodo(x),
    (model, args) => model.id !== args.id
);

export type TodoRepo = typeof todoRepo;
