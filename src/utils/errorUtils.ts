import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-API";
import {AppActionsType} from "../app/store";
import { Dispatch } from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error :"Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = <D>(error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC({error: error.message? error.message : "Some error occurred"}))
    dispatch(setAppStatusAC({status: 'failed'}))
}