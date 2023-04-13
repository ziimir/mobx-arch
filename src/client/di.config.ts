import 'reflect-metadata';

import {Container, interfaces} from "inversify";

import {TodoList, TodoListFactory} from "../ddd/models/todo-list/todo-list";
import {TodoListDTO} from '../ddd/models/todo-list/todo-list-types';

export const container = new Container();

//container.bind<{new(args: any): TodoList}>('TodoListConstructor').toConstructor(TodoList);
//container.bind<TodoListFactory>(TodoListFactory).toSelf();

container.bind<TodoList>(TodoList).toSelf().inSingletonScope();

container.bind<interfaces.Factory<TodoList>>('Factory<TodoList>').toFactory<TodoList, [TodoListDTO]>((
    context: interfaces.Context
) => {
    return (args) => {
        const tdl = context.container.get<TodoList>(TodoList);
        tdl.init(args);
        return tdl;
    };
})
