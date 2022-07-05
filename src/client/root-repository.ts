import {createModelRepo} from '../ddd/utils/model-repo';

import {todoRepo} from '../ddd/models/todo';
import {todoListRepo} from '../ddd/models/todo-list';
import {userRepo} from '../ddd/models/user';

import {registerTodoAggregation} from '../ddd/aggregation/todo';

export const rootRepo = {
    userAgg: userRepo,
    todoListAgg: createModelRepo(
        registerTodoAggregation({user: userRepo, todoList: todoListRepo, todo: todoRepo}),
        (todoAggregation) => todoAggregation,
        () => false
    )
};

export type RootRepo = typeof rootRepo;
