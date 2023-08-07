import {SceneLifecycle} from './scene-lifecycle';

export abstract class SceneStateTst {
    constructor(public lifecycle: SceneLifecycle) {}

    abstract handle(load: () => Promise<any>, x: any): any;

    onPending(): void {}

    onSuccess(): void {}

    onError(): void {}

    onRetry(): void {}
}

export class InitialStateTst extends SceneStateTst {
    //constructor(lifecycle: SceneLifecycle) {
        //super(lifecycle);
    //}

    //onPending() {
        //this.lifecycle.setState(new PendingStateTst(this.lifecycle));
    //}

    handle() {
        return 'initial';
    }
}

export class PendingStateTst extends SceneStateTst {
    //constructor(lifecycle: SceneLifecycle) {
        //super(lifecycle);
    //}

    //onSuccess() {
        //this.lifecycle.setState(new SuccessStateTst(this.lifecycle));
    //}

    //onError() {
        //this.lifecycle.setState(new ErrorStateTst(this.lifecycle));
    //}

    handle() {
        return 'pending...';
    }
}

export class SuccessStateTst extends SceneStateTst {
    //constructor(lifecycle: SceneLifecycle) {
        //super(lifecycle);
    //}

    handle() {
        return 'success';
    }
}

export class ErrorStateTst extends SceneStateTst {
    //constructor(public lifecycle: SceneLifecycle) {
        //super(lifecycle);
    //}

    //onRetry() {
        //this.lifecycle.setState(new PendingStateTst(this.lifecycle));
    //}

    handle() {
        return 'error';
    }
}

////////////////////////////////

/*
export interface SceneState {
    handle(x?: any): any
}

export class InitialState implements SceneState {
    handle(): any {
        return 'initial';
    }
}

export class PendingState implements SceneState {
    handle(): any {
        return 'pending...';
    }
}

export class SuccessState implements SceneState {
    handle(): any {
        return 'success';
    }
}

export class ErrorState implements SceneState {
    constructor(private _error?: any) {}

    get error() {
        return this._error;
    }

    handle(): any {
        return 'error';
    }
}
*/
