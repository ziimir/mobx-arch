import React from 'react';
import {Typography} from 'antd';

import {ErrorStateTst} from '../../../utils/scene-state';

export class SceneErrorState extends ErrorStateTst {
    constructor(error?: 'err' | 'warn') {
        super(error);
    }

    handle() {
        return (
            <Typography.Text type="danger">
                {this.error && `something went wrong: ${this.error}`}
            </Typography.Text>
        );
    }
}
