import head from 'lodash/head';

import {TodoAggregation} from './todo-aggregation';

import {TodoRepo} from '../../models/todo';
import {TodoListRepo} from '../../models/todo-list';
import {UserRepo} from '../../models/user';

interface TodoAggregationRepos {
    todoList: TodoListRepo;
    todo: TodoRepo;
    user: UserRepo;
}

export const registerTodoAggregation = (repos: TodoAggregationRepos) =>
    (todoListId: number) =>
        repos.user.fetchWithCache()
            .then((user) => repos.todoList.fetchWithCache({user: user.uid, id: todoListId}))
            .then((todoList) => {
                const firstTodo = head(todoList.list);

                return repos.todo.fetchWithCache({id: firstTodo.id})
                    .then(() => new TodoAggregation(repos));
            });
