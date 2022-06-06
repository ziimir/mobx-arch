import React, {PureComponent, MouseEvent} from 'react';

import {EmptyObject} from '../types/common';

import {TodoListScene} from './scenes/todo-list';

export class App extends PureComponent<EmptyObject, EmptyObject> {
    ref = React.createRef();

    handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log('scene ref', this.ref.current);
    };

    render() {
        return (
            <div>
                <div>Apppppppppp</div>
                <div><a href="#" onClick={this.handleClick}>get scene ref</a></div>
                <TodoListScene ref={this.ref} someOwnProp="cmon, it\'s me" />
            </div>
        );
    }
}
