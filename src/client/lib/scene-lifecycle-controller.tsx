import React from 'react';

type SceneLFState = initial' | 'pending' | 'success' | 'error';

interface IController {
    state: SceneLFState;
    error: any;
    load: () => Promise<any>;
}

export class SceneLF implements IController {
    state: SceneLFState = 'initial';

    error = null;

    constructor(loadFn: () => Promise<any>) {
        this.load = loadFn;

        makeObservable(this, {
            state: observable.ref,
            setState: action
        });
    }

    private setState(state: SceneLFState) {
        this.state = state;
    }

    public setPending() {
        this.setState('pending');
    }

    public setSuccess() {
        this.setState('success');
    }

    public setError() {
        this.setState('error');
    }
}

interface Props {
    controller: IController;
    initialView: React.ReactNode;
    pendingView: React.ReactNode;
    successView: React.ReactNode;
    errorView: React.ReactNode;
}

export class SceneEl extends React.PureComponent<Props> {
    renderInitial() {
        return React.cloneElement(this.props.initialView, {onMount: this.props.controller.load});
    }

    renderPending() {
        return this.props.pendingView;
    }

    renderSuccess() {
        return this.props.successView;
    }

    renderError() {
        return React.cloneElement(this.props.errorView, {error: this.props.controller.error, onReset: this.props.controller.load});
    }

    render() {
        switch (this.props.controller.state) {
            case 'initial':
                return this.renderInitial();

            case 'pending':
                return this.renderPending();

            case 'success':
                return this.renderSuccess();

            case 'error':
            default:
                return this.renderError();
        }
    }
}
