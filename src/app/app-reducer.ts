import {authAPI} from "../api/todolists-API";
import {setIsLoginIn} from "../features/Login/auth-reducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    error: null as null | string,
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
        setAppIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const appReducer = slice.reducer;

export const {setAppStatusAC, setAppErrorAC, setAppIsInitializedAC} = slice.actions

export const initializedAppTC = () => (dispatch: Dispatch) => {
            authAPI.authMe().then(res => {
                if (res.data.resultCode === 0){
                    dispatch(setIsLoginIn({value: true}))
                } else {

                }
                dispatch(setAppIsInitializedAC({isInitialized: true}))
            })
}

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//
// export type InitialStateType = {
//     //происходит ли сейчас взаимодействие с сервисом
//     status: StatusType,
//     // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
//     error: string | null,
//     //true - когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
//     isInitialized: boolean
// }


