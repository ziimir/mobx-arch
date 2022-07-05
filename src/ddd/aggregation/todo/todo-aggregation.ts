import {unwrapDeps} from '../../utils/unwrap-deps';

import {TodoListRepo} from '../../models/todo-list';
import {TodoRepo} from '../../models/todo';

type DepsRepo = {
    todoList: TodoListRepo,
    todo: TodoRepo
};

const checkTodoProvider = {
    check: (id: number)  => {
        return new Promise<{id: number, isDone: boolean}>((resolve) => {
            setTimeout(() => {
                resolve({id, isDone: true});
            }, 2000);
        });
    }
}

export class TodoAggregation {
    private repos;

    private deps;

    constructor(repos: DepsRepo) {
        this.repos = repos;

        this.deps = unwrapDeps({
            todoList: repos.todoList,
            todo: repos.todo
        });
    }

    get getList() {
        return this.deps.todoList.list;
    }

    get todo() {
        return this.deps.todo;
    }

    // ну вот тут я и сломался:
    // из aggregation нужно все таки дергать fetch,
    // от чего я и хотел уйти
    fetchTodoWithCache(id: number) {
        return this.repos.todo.fetchWithCache({id});
    }

    checkTodo(id: number) {
        return checkTodoProvider.check(id)
            .then((data) => {
                const listTodo = this.deps.todoList.list.find(({id: listId}) => listId === id);
                const detailedTodo = this.deps.todo;

                if (listTodo) {
                    // не смотря на то что мы вызываем асинхронно метод
                    // сам метод - экешн и mobx норм подхватывает изменения
                    listTodo.toggleIsDone();

                    if (id === detailedTodo.id) {
                        detailedTodo.toggleIsDone();
                    }
                }

                return data;
            });
    }
}
