import React, {FC, memo} from 'react';
import {createCn} from 'bem-react-classname';

import {ToDo} from '../to-do/to-do';

interface Props {
    className?: string;
    toDoList: {id: number; text: string; isDone: boolean}[]
}

export const ToDoList: FC<Props> = memo((props) => {
    const cn = createCn('to-do-list', props.className);

    return (
        <div className={cn()}>
            {props.toDoList.map((x) => <ToDo key={`${x.id}-${x.text}`} {...x} />)}
        </div>
    );
});

ToDoList.displayName = 'ToDoList';
