import {addTaskAC, removeTaskAC} from "../features/todoLists/todolist/task/tasks-reducer";
import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-API";
import {setIsLoginIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatusAC:(state, action: PayloadAction<{status: StatusType}>) => {
            state.status = action.payload.status;
        },
        setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error;
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{value: boolean}>) => {
            state.isInitialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer;

// export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
//     switch (action.type){
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-IS-INITIALIZED':
//             return {...state, isInitialized: action.value}
//         default:
//             return {...state};
//     }
// }

export const {setAppStatusAC, setAppErrorAC, setAppIsInitializedAC} = slice.actions

export const initializedAppTC = (): AppThunk => (dispatch) => {
            authAPI.authMe().then(res => {
                if (res.data.resultCode === 0){

                    // @ts-ignore
                    dispatch(setIsLoginIn({value: true}))
                } else {

                }
                dispatch(setAppIsInitializedAC({value: true}))
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


