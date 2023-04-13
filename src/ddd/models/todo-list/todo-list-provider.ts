import {TodoListDTO} from './todo-list-types';

interface GetTodoListRequest {
    id: number;
    user: number;
}

interface GetTodoListResponse {
    items: TodoListDTO;
}

export const fetchTodoList = (data: GetTodoListRequest) => new Promise<GetTodoListResponse>((resolve) => {
    setTimeout(
        () => resolve({items: data.id === 1 ? list1 : list2}),
        300
    );
});

const list1 = [
    {
        id: 1,
        text: 'Learn js'
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
        text: 'Learn webassembly',
        isDone: true
    }
];

const list2 = [
    {
        id: 6,
        text: 'Install a C++ compiler',
        isDone: true
    },
    {
        id: 7,
        text: 'Learn C++'
    },
    {
        id: 8,
        text: 'Learn pointers'
    },
    {
        id: 9,
        text: 'Learn embedded C++'
    }
];
