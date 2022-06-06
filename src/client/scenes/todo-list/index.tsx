import {withScene, OnSceneMount, SceneViewProps} from '../../react-utils/with-scene-hoc';
import {rootRepository, RootRepo} from '../../root-repository';

import {TodoListController} from './todo-list-controller';
import {TodoListView} from './todo-list-view';

function loadData(rootRepo: RootRepo): OnSceneMount {
    return (ownProps: SceneViewProps<typeof TodoListView>) => {
        console.log('=======SCENE LOAD DATA=======');
        console.log('rootRepo', rootRepo);
        console.log('ownProps', ownProps);
        console.log('=============================');

        return rootRepo.todoList.fetch('2143', 10293470);
    };
}

export const TodoListScene = withScene(
    {
        onMount: loadData(rootRepository),
        renderLoader: () => <div>...custom loading...</div>
    },
    new TodoListController(rootRepository)
)(TodoListView);
