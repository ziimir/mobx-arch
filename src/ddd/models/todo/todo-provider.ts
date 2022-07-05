import {TodoDTO} from './todo-types';

interface GetTodoRequest {
    id: number;
}

type GetTodoResponse = TodoDTO

export const fetchTodo = (data: GetTodoRequest) => new Promise<GetTodoResponse>((resolve) => {
    setTimeout(
        () => resolve({
            id: data.id,
            text: `Learn react № ${data.id}`,
            isDone: false,
            description: 'learn, learn, learn, learn, learn, learn'
        }),
        2000
    );
});
