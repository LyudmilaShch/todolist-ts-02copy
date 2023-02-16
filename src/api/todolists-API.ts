import axios from 'axios'
import {
    GetTasksResponse,
    LoginParamsType,
    TaskType,
    TodolistType,
    ResponseType, UpdateTaskModelType
} from './types'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "51d9ed61-5ad6-4592-a3bb-8a8eac3e6984"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
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

//auth api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>("auth/login")
    },
    authMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>("auth/me")
    }
}

