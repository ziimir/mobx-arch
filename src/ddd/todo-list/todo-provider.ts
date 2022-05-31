import {TodoListDTO} from './todo-list-types';

interface GetTodoListResponse {
    items: TodoListDTO;
}

export const fetchTodo = (id: string, uid: number) => new Promise<GetTodoListResponse>((resolve) => {
    setTimeout(
        () => resolve({
            items: [{
                    id: '1' + id,
                    text: 'one' + id
                }, {
                    id: '2' + id,
                    text: 'two' + id
                }, {
                    id: '3' + id,
                    text: 'three' + id,
                    isDone: true
                }
            ]
        }),
        1000
    )
});
