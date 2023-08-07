import React, {FC, memo, useMemo} from 'react';
import {createCn} from 'bem-react-classname';

import {useContainer} from 'inversify-react';

interface Props {
}

export const Reset: FC<Props> = memo((props) => {
    const cn = createCn('reset', props.className);

    const c = useContainer();
    const todoListFactory = c.get('Factory<TodoList>');
    //const todoList = useMemo(() => todoListFactory([{id: 99, text}]), [text]);

    const handleClick = () => {
        todoListFactory([{id: 101, text: 'one0one'}])
    };

    return (
        <div className={cn()}>
            <button onClick={handleClick}>click</button>
        </div>
    );
});

Reset.displayName = 'Reset';
