import {SceneLifecycle} from '../../utils/scene-lifecycle';

import {
    SceneInitialState,
    ScenePendingState,
    SceneSuccessState,
    SceneErrorState
} from './states';

const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export class Scene {
    lifecycle: SceneLifecycle;

    constructor() {
        this.lifecycle = new SceneLifecycle(
            SceneInitialState,
            ScenePendingState,
            SceneSuccessState,
            SceneErrorState
        );
    }

    public load() {
        this.lifecycle.setPending();

        delay(3000)
            //.then(() => {
                //throw new Error('warn');
            //})
            .then(() => {
                this.lifecycle.setSuccess();
            })
            .catch((err) => {
                this.lifecycle.setError();
            })
    }

    render(props) {
        return this.lifecycle.handle(() => this.load(), props);
    }
}
