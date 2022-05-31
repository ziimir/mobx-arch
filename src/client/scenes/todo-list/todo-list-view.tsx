import React, {FC, ForwardRefRenderFunction, useContext, useEffect, forwardRef} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {createCn} from 'bem-react-classname';

import {ToDo} from '../../components/to-do/to-do';

import {SceneProps} from './index';

interface Props {
    className?: string;
}

export const TodoListView = observer(forwardRef<HTMLDivElement, Props & SceneProps>((props, ref) => {
    const cn = createCn('todo-scene', props.className);

    const scene = props.scene;

    useEffect(() => {
        scene.loadData();
    }, []);

    return (
        <div className={cn('ref')} ref={ref}>
            {
                scene.list
                    ? (
                        <div className={cn()}>
                            {
                                scene.list.list
                                    .map((todo) => {
                                        const plainTodo = toJS(todo);

                                        return (
                                            <ToDo
                                                key={plainTodo.id}
                                                {...plainTodo}
                                                onTextChange={(text) => todo.updateText(text)}
                                            />
                                        );
                                    })
                            }
                        </div>
                    )
                    : null
            }
        </div>
    );
}));

TodoListView.displayName = 'TodoListView';
