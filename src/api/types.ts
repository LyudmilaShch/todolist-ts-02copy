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
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = { field: string; error: string }

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors?: Array<FieldErrorType>,
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
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}