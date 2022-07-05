import {unwrapDeps} from '../../../ddd/utils/unwrap-deps';

import {RootRepo} from '../../root-repository';

export class TodoController {
    private deps;

    constructor(rootRepo: RootRepo) {
        this.deps = unwrapDeps({
            todo: rootRepo.todoListAgg
        });
    }

    get todo() {
        return this.deps.todo.todo;
    }
}

export type SceneProps = {scene: InstanceType<typeof TodoController>};
