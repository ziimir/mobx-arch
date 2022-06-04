import {TodoListDTO} from './todo-list-types';

interface GetTodoListResponse {
    items: TodoListDTO;
}

export const fetchTodo = (id: string, uid: number) => new Promise<GetTodoListResponse>((resolve) => {
    setTimeout(
        () => resolve({
            items: [{
                id: `1 ${id} ${uid}`,
                text: `one ${id} ${uid}`
            }, {
                id: `2 ${id} ${uid}`,
                text: `two ${id} ${uid}`
            }, {
                id: `3 ${id} ${uid}`,
                text: `three ${id} ${uid}`,
                isDone: true
            }]
        }),
        1000
    );
});
