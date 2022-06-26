import React, {useEffect, forwardRef} from 'react';
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
            <div>{`${scene.ownerName}`} Тебе еще вот столько нужно сдеалть:</div>
            {
                scene.list
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
    );
}));

TodoListView.displayName = 'TodoListView';
