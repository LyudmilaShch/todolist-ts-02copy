import {authAPI} from "../api/todolists-API";
import {setIsLoginIn} from "../features/Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initializedAppTC = createAsyncThunk('app/initializedApp', async (param, {dispatch}) => {
    const res = await authAPI.authMe()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoginIn({value: true}))
    } else {

    }
})

export const asyncActions = {
    initializedAppTC
}

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle',
        error: null as null | string,
        isInitialized: false
    },
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status;
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
    },
    extraReducers: builder => {
        builder.addCase(initializedAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})
export const appReducer = slice.reducer;

export const {setAppStatusAC, setAppErrorAC} = slice.actions

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// export type InitialStateType = {
//     //происходит ли сейчас взаимодействие с сервисом
//     status: StatusType,
//     // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
//     error: string | null,
//     //true - когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
//     isInitialized: boolean
// }


