import {TodoAggregation} from './todo-aggregation';

import {TodoListRepo} from '../../models/todo-list';
import {UserRepo} from '../../models/user';

interface TodoAggregationRepos {
    todoList: TodoListRepo;
    user: UserRepo;
}

export const registerTodoAggregation = (repos: TodoAggregationRepos) =>
    (todoListId: number) =>
        repos.user.fetch()
            .then((user) => repos.todoList.fetch({user: user.uid, id: todoListId}))
            .then(() => new TodoAggregation(repos.todoList));
