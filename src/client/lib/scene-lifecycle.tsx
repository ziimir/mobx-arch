import React, {PureComponent} from 'react';
import {createCn} from 'bem-react-classname';

interface Props {
    load: () => Promise<any>;
}

export class SceneLifecycle extends PureComponent<Props> {
    cn = createCn('scene-lifecycle');

    renderInitial() {

    }

    renderPending() {

    }

    renderSuccess() {

    }

    renderError() {

    }

    render() {
        return (
            <div className={this.cn()}>

            </div>
        );
    }
}
