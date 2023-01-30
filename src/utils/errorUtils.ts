import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-API";
import { Dispatch } from "@reduxjs/toolkit";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    debugger
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error :"Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = <D>(error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message? error.message : "Some error occurred"}))
    dispatch(setAppStatusAC({status: 'failed'}))
}