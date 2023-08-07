import React from 'react';
import {Typography} from 'antd';

import {SuccessStateTst} from '../../../utils/scene-state';

export class SceneSuccessState extends SuccessStateTst {
    handle(_load, props) {
        return (
            <div>
                <div>
                    <Typography.Text type="success">
                        someComponenet
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text type="warning">
                        {props.ownProp}
                    </Typography.Text>
                </div>
            </div>
        );
    }
}
