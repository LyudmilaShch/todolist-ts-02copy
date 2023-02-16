import {authAPI} from "../../api/todolists-API";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils";
import {appActions} from "../CommonActions/App";

const {setAppStatus} = appActions
export const login = createAsyncThunk<undefined, LoginParamsType,
    {
        rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
    }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)

        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    login, logout
}

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoginIn: false
    },
    reducers: {
        setIsLoginIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoginIn = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoginIn = false;
            })
    }
})
export const {setIsLoginIn} = slice.actions





