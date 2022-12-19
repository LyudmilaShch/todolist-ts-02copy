import {addTaskAC, removeTaskAC} from "../features/todoLists/todolist/task/tasks-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state};
    }
}

export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: StatusType,
    error: string | null
}

export type ActionTypes =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


