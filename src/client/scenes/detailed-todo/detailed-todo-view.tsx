import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {createCn} from 'bem-react-classname';
import {Typography} from 'antd';

import {SceneProps} from './detailed-todo-controller';

interface Props {
    className?: string;
}

export const DetailedTodoView: FC<SceneProps & Props> = observer((props) => {
    const cn = createCn('detailed-todo-view', props.className);

    return (
        <div className={cn()}>
            <Typography.Title>
                <Typography.Text type={props.scene.todo.isDone ? 'success' : undefined}>
                    Задача № {props.scene.todo.id}
                </Typography.Text>
            </Typography.Title>
            <Typography.Text>
                {props.scene.todo.description}
            </Typography.Text>
        </div>
    );
});

DetailedTodoView.displayName = 'DetailedTodoView';
