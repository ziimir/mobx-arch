import {withScene, OnSceneMount, SceneViewProps} from '../../react-utils/with-scene-hoc';
import {rootRepo, RootRepo} from '../../root-repository';

import {TodoListController} from './todo-list-controller';
import {TodoListView} from './todo-list-view';

function loadData(rootRepo: RootRepo): OnSceneMount {
    return (ownProps: SceneViewProps<typeof TodoListView>) => {
        console.log('=======SCENE LOAD DATA=======');
        console.log('rootRepo', rootRepo);
        console.log('ownProps', ownProps);
        console.log('=============================');

        return Promise.all([
            rootRepo.userAgg.fetch(),
            rootRepo.todoListAgg.fetch(111111)
        ]);
    };
}

export const TodoListScene = withScene(
    {
        onMount: loadData(rootRepo),
        renderLoader: () => <div>...custom loading...</div>
    },
    new TodoListController(rootRepo)
)(TodoListView);
