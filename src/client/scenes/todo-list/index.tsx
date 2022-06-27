import {Spin} from 'antd';

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
            rootRepo.userAgg.fetchWithCache(),
            rootRepo.todoListAgg.fetchWithCache(1)
        ]);
    };
}

export const TodoListScene = withScene(
    {
        onMount: loadData(rootRepo),
        renderLoader: () => <Spin style={{margin: '32px auto', display: 'block'}} size="large" />
    },
    new TodoListController(rootRepo)
)(TodoListView);
