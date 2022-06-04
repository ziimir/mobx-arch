import {withScene} from '../../react-utils/with-scene-hoc';

import {todoListScene} from './todo-list-controller';
import {TodoListView} from './todo-list-view';

export const TodoListScene = withScene(todoListScene)(TodoListView);
