import {observer} from 'mobx-react';
import React, {FC, useEffect, useMemo} from 'react';

import {Scene} from './tst-controller';

interface Props {
    ownProp: 'own' | 'outer';
}

export const TstView: FC<Props> = observer((props: Props) => {
    const scene = useMemo(() => new Scene(), []);

    //useEffect(() => {
        //scene.load();
    //}, []);

    return scene.render(props);
});

TstView.displayName = 'TstView';
