import React, {FC, memo} from 'react';
import {createCn} from 'bem-react-classname';

import {SceneEl} from './scene-lifecycle-controller';

interface Props {
}

export const SceneLifecycleTest: FC<Props> = memo((props) => {
    //const cn = createCn('scene-lifecycle-test', props.className);

    return (
        <SceneEl
            initialView={<div>initial</div>}
            pendingView={<div>pending...</div>}
            successView={<div>success</div>}
            errorView={<div>error</div>}
        />
    );
});

SceneLifecycleTest.displayName = 'SceneLifecycleTest';
