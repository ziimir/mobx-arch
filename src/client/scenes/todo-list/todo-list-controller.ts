import {unwrapDeps} from '../../../ddd/utils/unwrap-deps';

import {RootRepo} from '../../root-repository';

export class TodoListController {
    private deps;

    constructor(rootRepo: RootRepo) {
        this.deps = unwrapDeps({
            user: rootRepo.userAgg,
            todoList: rootRepo.todoListAgg
        });
    }

    get ownerName() {
        return this.deps.user.name;
    }

    get list() {
        return this.deps.todoList.getList;
    }

    loadTodo = (id: number) => {
        return this.deps.todoList.fetchTodoWithCache(id);
    };

    checkTodo = (id: number) => {
        return this.deps.todoList.checkTodo(id);
    };
}

export type SceneProps = {scene: InstanceType<typeof TodoListController>};
