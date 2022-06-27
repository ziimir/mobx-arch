import {TodoListDTO} from './todo-list-types';

interface GetTodoListRequest {
    id: number;
    user: number;
}

interface GetTodoListResponse {
    items: TodoListDTO;
}

export const fetchTodo = (data: GetTodoListRequest) => new Promise<GetTodoListResponse>((resolve) => {
    setTimeout(
        () => resolve({items: data.id === 1 ? list1 : list2}),
        300
    );
});

const list1 = [
    {
        id: 1,
        text: 'Learn js',
        isDone: true
    },
    {
        id: 2,
        text: 'Learn react'
    },
    {
        id: 3,
        text: 'Learn redux'
    },
    {
        id: 4,
        text: 'Learn mobx'
    },
    {
        id: 5,
        text: 'Learn webassembly'
    }
];

const list2 = [
    {
        id: 6,
        text: 'Learn about C++\'s history'
    },
    {
        id: 7,
        text: 'Install a C++ compiler',
        isDone: true
    },
    {
        id: 8,
        text: 'Choose a tutorial or two to start learning C++'
    },
    {
        id: 9,
        text: 'Try out each new concept'
    },
    {
        id: 10,
        text: 'Learn from other developer'
    },
    {
        id: 11,
        text: 'Work through problems using the concepts you have learned'
    },
    {
        id: 12,
        text: 'Help others who need help'
    }
];
