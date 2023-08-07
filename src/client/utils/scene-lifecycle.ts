import {observable, action, makeObservable} from 'mobx';
import {computedFn} from 'mobx-utils';

import {
    SceneStateTst,
    InitialStateTst,
    PendingStateTst,
    SuccessStateTst,
    ErrorStateTst
} from './scene-state';

export class SceneLifecycle {
    _state: SceneStateTst;


    constructor(
        InitialStateC = InitialStateTst,
        PendingStateC = PendingStateTst,
        SuccessStateC = SuccessStateTst,
        ErrorStateC = ErrorStateTst
    ) {
        this.InitialStateC = InitialStateC;
        this.PendingStateC = PendingStateC;
        this.SuccessStateC = SuccessStateC;
        this.ErrorStateC = ErrorStateC;

        this._state = new this.InitialStateC();

        makeObservable(this, {
            _state: observable.ref,
            setState: action
        });
    }

    public setState(state: SceneStateTst) {
        this._state = state;
    }

    public setPending() {
        this.setState(new this.PendingStateC());
        //this._state.onPending();
    }

    public setSuccess() {
        this.setState(new this.SuccessStateC());
        //this._state.onSuccess();
    }

    public setError() {
        this.setState(new this.ErrorStateC());
        //this._state.onError();
    }

    handle = computedFn((x: any, load: () => Promise<any>) => {
        return this._state.handle(x, load);
    })
}

/*
export class SceneLifecycle {
    _state: SceneState;

    constructor(
        private initialStateCnstr: {new(): SceneState} = InitialState,
        private pendingStateCnstr: {new(): SceneState} = PendingState,
        private successStateCnstr: {new(): SceneState} = SuccessState,
        private errorStateCnstr: {new(): SceneState} = ErrorState
    ) {
        this._state = new initialStateCnstr;

        makeObservable(this, {
            _state: observable.ref,
            setState: action
        });
    }

    public setState(state: SceneState) {
        this._state = state;
    }

    public changeToPending() {
        this.setState(new this.pendingStateCnstr());
    }

    public changeToSuccess() {
        this.setState(new this.successStateCnstr());
    }

    public changeToError<T>(error?: T) {
        this.setState(new this.errorStateCnstr(error));
    }

    handle = computedFn((x?: any) => {
        return this._state.handle(x);
    })
}
*/
