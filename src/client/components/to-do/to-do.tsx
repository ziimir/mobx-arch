import React, {FC, memo} from 'react';
import {createCn} from 'bem-react-classname';

interface Props {
    className?: string;
    text: string;
    isDone: boolean;
}

export const ToDo: FC<Props> = memo((props) => {
    const cn = createCn('to-do', props.className);

    return (
        <div className={cn()}>
            {props.text}
            {' '}
            {props.isDone ? 'готов' : 'не готов'}
        </div>
    );
});

ToDo.displayName = 'ToDo';
