import {makeAutoObservable} from 'mobx';

import {RootRepo} from '../../root-repository';

export class TodoListController {
    private rootRepo;

    private todoListRepo;

    constructor(rootRepository: RootRepo) {
        this.rootRepo = rootRepository;
        this.todoListRepo = this.rootRepo.todoList;

        makeAutoObservable(this);
    }

    get list() {
        // тут важно ссылаться именно на обзервабл, вот валью - это обзервабл совойсво в ModelContainer
        return this.todoListRepo.get();
    }

    asyncIndependentFetchTodoListForDemonstrateReasons() {
        setTimeout(() => {
            this.todoListRepo.fetch('00000000', 10)
                .then(() => console.log('2 atempt'));
        }, 2000);
    }
}

export type SceneProps = {scene: InstanceType<typeof TodoListController>};
