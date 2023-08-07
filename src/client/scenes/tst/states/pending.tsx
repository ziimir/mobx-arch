import React from 'react';
import {Spin} from 'antd';

import {PendingStateTst} from '../../../utils/scene-state';

export class ScenePendingState extends PendingStateTst {
    handle() {
        return (<Spin size="large" />);
    }
}
