import {authAPI, LoginParamsType} from "../../api/todolists-API";
import {AppActionsType} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/errorUtils";

const initialState: LoginStateType = {
    isLoginIn: false
}

export const authReducer = (state: LoginStateType = initialState, action: AuthActionsTypes): LoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGIN-IN": {
            console.log(state.isLoginIn)
            return {...state, isLoginIn: action.value}
        }
        default:
            return state;
    }
}

export const setIsLoginIn = (value: boolean) =>
    ({type: "login/SET-IS-LOGIN-IN", value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAppError(error, dispatch)

        })
}
export const logoutTC = () => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAppError(error, dispatch)

        })
}


// types

export type AuthActionsTypes = ReturnType<typeof setIsLoginIn>

type LoginStateType = {
    isLoginIn: boolean
}

