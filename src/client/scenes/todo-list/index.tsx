import React, {FC, useContext, useEffect} from 'react';
import {observer} from 'mobx-react';

import {withScene} from '../../react-utils/with-scene-hoc';

import {todoListScene} from './todo-list-controller';
import {TodoListView} from './todo-list-view';

export type SceneProps = {scene: typeof todoListScene};

export const TodoListScene = withScene(todoListScene)(TodoListView);
