import React, {PureComponent} from 'react';

import {EmptyObject} from '../types/common';

import {TodoListScene} from './scenes/todo-list';

export class App extends PureComponent<EmptyObject, EmptyObject> {
    ref = React.createRef();

    componentDidMount() {
        console.log('=============================+>', this.ref.current);
    }

    render() {
        return (
            <div>
                Apppppppppp
                <TodoListScene ref={this.ref} />
            </div>
        );
    }
}
