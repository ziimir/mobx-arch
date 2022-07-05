export interface TodoItemDTO {
    id: number;
    text: string;
    isDone?: boolean;
}

export type TodoListDTO = TodoItemDTO[];
