import {authAPI, LoginParamsType} from "../../api/todolists-API";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoginIn: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoginIn(state, action: PayloadAction<{value: boolean}>) {
           state.isLoginIn = action.payload.value;
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoginIn} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAppError(error, dispatch)

        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAppError(error, dispatch)

        })
}


