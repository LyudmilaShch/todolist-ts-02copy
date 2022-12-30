import {addTaskAC, removeTaskAC} from "../features/todoLists/todolist/task/tasks-reducer";
import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-API";
import {setIsLoginIn} from "../features/Login/auth-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state};
    }
}

export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializedAppTC = (): AppThunk => (dispatch) => {
            authAPI.authMe().then(res => {
                if (res.data.resultCode === 0){
                    dispatch(setIsLoginIn(true))
                } else {

                }
                dispatch(setAppIsInitializedAC(true))
            })
}

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервисом
    status: StatusType,
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null,
    //true - когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export type ActionTypes =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppIsInitializedAC>


