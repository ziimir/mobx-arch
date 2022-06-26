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
        () => resolve({
            items: [{
                id: `1 ${data.id}`,
                text: `one ${data.id}`
            }, {
                id: `2 ${data.id}`,
                text: `two ${data.id}`
            }, {
                id: `3 ${data.id}`,
                text: `three ${data.id}`,
                isDone: true
            }]
        }),
        300
    );
});
