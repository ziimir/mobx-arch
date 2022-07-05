import {withScene} from '../../react-utils/with-scene-hoc';
import {rootRepo} from '../../root-repository';

import {TodoController} from './detailed-todo-controller';
import {DetailedTodoView} from './detailed-todo-view';

export const DetailedTodoScene = withScene(
    {},
    new TodoController(rootRepo)
)(DetailedTodoView);
