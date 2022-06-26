import {createModelRepo} from '../ddd/utils/model-repo';

import {todoListRepo} from '../ddd/models/todo-list';
import {userRepo} from '../ddd/models/user';

import {registerTodoAggregation} from '../ddd/aggregation/todo';

export const rootRepo = {
    userAgg: userRepo,
    todoListAgg: createModelRepo(
        registerTodoAggregation({user: userRepo, todoList: todoListRepo}),
        (todoAggregation) => todoAggregation
    )
};

export type RootRepo = typeof rootRepo;
