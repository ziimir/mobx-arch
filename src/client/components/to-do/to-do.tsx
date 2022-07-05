import noop from 'lodash/noop';
import {Checkbox, Spin} from 'antd';

import React, {FC, memo} from 'react';
import {createCn} from 'bem-react-classname';

import {PageState} from '../../../types/page-state';

import {useRequestState} from '../../react-utils/use-request-state';

interface Props {
    className?: string;
    id: number;
    text: string;
    isDone: boolean;
    onTextChange: (text: string) => void;
    onCheck: (id: number) => Promise<{isDone: boolean}>;
}

export const ToDo: FC<Props> = memo((props) => {
    const cn = createCn('to-do', props.className);

    const [checkTodo, _, checkTodoPageState]  = useRequestState(props.onCheck);

    return (
        <div className={cn()}>
            <Checkbox checked={props.isDone} onChange={() => checkTodo(props.id).catch(noop)} />
            {' '}
            {props.isDone ? <s>{props.text}</s> : props.text}
            {checkTodoPageState === PageState.LOADING && <Spin />}
        </div>
    );
});

ToDo.displayName = 'ToDo';
