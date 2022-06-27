import React, {useEffect, forwardRef} from 'react';
import {Divider, List} from 'antd';

import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {createCn} from 'bem-react-classname';

import {ToDo} from '../../components/to-do/to-do';

import {SceneProps} from './todo-list-controller';

interface Props {
    className?: string;
    someOwnProp?: string;
}

export const TodoListView = observer(forwardRef<HTMLDivElement, Props & SceneProps>((props, ref) => {
    const cn = createCn('todo-scene', props.className);

    const {scene} = props;

    useEffect(() => {
        scene.asyncIndependentFetchTodoListForDemonstrateReasons();
    }, []);

    return (
        <div className={cn()} ref={ref}>
            <Divider orientation="left">{`${scene.ownerName}`} тебе еще вот столько нужно сдеалть:</Divider>
            <List
                bordered
                dataSource={scene.list}
                renderItem={(todo) => {
                    const plainTodo = toJS(todo);

                    return (
                        <List.Item>
                            <ToDo
                                {...plainTodo}
                                onTextChange={(text) => todo.updateText(text)}
                            />
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}));

TodoListView.displayName = 'TodoListView';
