import noop from 'lodash/noop';
import React, {forwardRef} from 'react';
import {Divider, List, Typography, Spin} from 'antd';
import {toJS} from 'mobx';
import {observer, Observer} from 'mobx-react';
import {createCn} from 'bem-react-classname';

import {PageState} from '../../../types/page-state';
import {ToDo} from '../../components/to-do/to-do';
import {useRequestState} from '../../react-utils/use-request-state';

import {DetailedTodoScene} from '../detailed-todo';

import {SceneProps} from './todo-list-controller';

interface Props {
    className?: string;
    someOwnProp?: string;
}

export const TodoListView = observer(forwardRef<HTMLDivElement, Props & SceneProps>((props, ref) => {
    const cn = createCn('todo-scene', props.className);

    const {scene} = props;

    const [loadTodo, _, loadTodoPageState]  = useRequestState(scene.loadTodo);

    return (
        <div className={cn()} ref={ref}>
            <Divider orientation="left">{`${scene.ownerName}`} тебе еще вот столько нужно сдеалть:</Divider>
            <List
                bordered
                dataSource={scene.list}
                renderItem={
                    (todo) => (
                        <Observer>
                            {() => {
                                const plainTodo = toJS(todo);
                                return (
                                    <List.Item>
                                        <ToDo
                                            {...plainTodo}
                                            onCheck={scene.checkTodo}
                                            onTextChange={(text) => todo.updateText(text)}
                                        />
                                        <Typography.Link
                                            href="#"
                                            disabled={loadTodoPageState === PageState.LOADING}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                loadTodo(todo.id).catch(noop);
                                            }}
                                        >
                                            Открыть
                                        </Typography.Link>
                                    </List.Item>
                                );
                            }}
                        </Observer>
                    )
                }
            />
            {
                loadTodoPageState === PageState.LOADING
                    ? <Spin size="large" />
                    : <DetailedTodoScene />
            }
        </div>
    );
}));

TodoListView.displayName = 'TodoListView';
