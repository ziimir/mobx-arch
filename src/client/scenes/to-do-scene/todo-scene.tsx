import React, {FC, useContext} from 'react';
import {observer} from 'mobx-react';
import {createCn} from 'bem-react-classname';

import {ToDoList} from '../../components/to-do-list/to-do-list';

import {MobxContext} from '../../mobx-context';

interface Props {
    className?: string;
}

export const TodoScene: FC<Props> = observer((props) => {
    const cn = createCn('todo-scene', props.className);

    const todo = useContext(MobxContext);

    return (
        <div className={cn()}>
            <ToDoList toDoList={todo.list} />
        </div>
    );
});

TodoScene.displayName = 'TodoScene';
