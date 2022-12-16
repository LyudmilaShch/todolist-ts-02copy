import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "ea3d9034-c1d2-4af3-a252-178ff469f42f"
    }
}

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        ...settings
    }
)
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
} //дженерик тип

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title?: string | undefined
    description?: string | undefined
    completed: boolean
    status: number
    priority: number
    startDate?: string | undefined
    deadline?: string | undefined
}

export type GetTasksResponse = {
    items: Array<TaskType>,
    error: string,
    totalCount: number
}


export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise;
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(id: string) {

        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
debugger
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {

        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {

        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },


}