import {Checkbox} from 'antd';

import React, {FC, memo} from 'react';
import {createCn} from 'bem-react-classname';

interface Props {
    className?: string;
    text: string;
    isDone: boolean;
    onTextChange: (text: string) => void;
}

export const ToDo: FC<Props> = memo((props) => {
    const cn = createCn('to-do', props.className);

    return (
        <div className={cn()}>
            <Checkbox checked={props.isDone} />
            {' '}
            {props.isDone ? <s>{props.text}</s> : props.text}
        </div>
    );
});

ToDo.displayName = 'ToDo';
