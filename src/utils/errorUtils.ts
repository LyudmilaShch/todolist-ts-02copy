import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-API";
import { Dispatch } from "@reduxjs/toolkit";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError = true) => {
   if (showError) {
       dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
   }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = <D>(error: { message: string }, dispatch: Dispatch, showError = true) => {
    if (showError){
        dispatch(setAppErrorAC({error: error.message? error.message : "Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}