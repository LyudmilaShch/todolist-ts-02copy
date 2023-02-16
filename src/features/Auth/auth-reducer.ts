import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-API";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const loginTC = createAsyncThunk<undefined, LoginParamsType,
    {
        rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
    }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkAppError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    }
})

export const asyncActions = {
    loginTC, logoutTC
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
        builder.addCase(loginTC.fulfilled, (state) => {
                state.isLoginIn = true;
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
                state.isLoginIn = false;
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoginIn} = slice.actions





