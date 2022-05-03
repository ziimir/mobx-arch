import {createContext} from 'react';

import {TodoList} from '../ddd/todo-list';

export const MobxContext = createContext<TodoList>();
