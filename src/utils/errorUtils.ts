import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-API";
import {AppActionsType} from "../app/store";
import { Dispatch } from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkAppError = <D>(error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(error.message? error.message : "Some error occurred"))
    dispatch(setAppStatusAC('failed'))
}