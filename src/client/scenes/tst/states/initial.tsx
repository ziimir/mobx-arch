import {observer} from 'mobx-react';
import React, {FC, useEffect} from 'react';
import {InitialStateTst} from '../../../utils/scene-state';

interface Props {
    onMount: () => any;
    children?: any;
}

const InitialView: FC<Props> = observer((props: Props) => {
    useEffect(() => {
        props.onMount()
    }, []);

    return props.children;
});

InitialView.displayName = 'PendingView';

export class SceneInitialState extends InitialStateTst {
    handle(load: () => Promise<any>) {
        return (
            <InitialView onMount={load}>
                request sended
            </InitialView>
        );
    }
}
