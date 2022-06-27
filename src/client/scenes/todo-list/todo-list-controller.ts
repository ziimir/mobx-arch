import {unwrapDeps} from '../../../ddd/utils/unwrap-deps';
import {todoListRepo} from '../../../ddd/models/todo-list';

import {RootRepo} from '../../root-repository';

export class TodoListController {
    deps;

    constructor(rootRepository: RootRepo) {
        this.deps = unwrapDeps({
            user: rootRepository.userAgg,
            todoList: rootRepository.todoListAgg
        });
    }

    get ownerName() {
        return this.deps.user.name;
    }

    get list() {
        return this.deps.todoList.getList;
    }

    asyncIndependentFetchTodoListForDemonstrateReasons() {
        setTimeout(() => {
            todoListRepo.fetch({user: 2, id: 2})
                .then(() => console.log('2 attempt'));
        }, 2000);
    }
}

export type SceneProps = {scene: InstanceType<typeof TodoListController>};
