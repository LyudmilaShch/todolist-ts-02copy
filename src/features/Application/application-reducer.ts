import {authAPI} from "../../api/todolists-API";
import {authActions} from "../Auth";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {appActions} from "../CommonActions/App";

const initializedApp = createAsyncThunk('application/initializedApp', async (param, {dispatch}) => {
    const res = await authAPI.authMe()
    if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoginIn({value: true}))
    } else {

    }
})

export const asyncActions = {
    initializedApp
}

export const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle',
        error: null as null | string,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializedApp.fulfilled, (state) => {
            state.isInitialized = true
        })
            .addCase(appActions.setAppStatus, (state, action) => {
            state.status = action.payload.status;
        })
            .addCase(appActions.setAppError, (state, action) => {
            state.error = action.payload.error;
        })
    }
})
// export const {setAppStatus, setAppError} = slice.actions

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


