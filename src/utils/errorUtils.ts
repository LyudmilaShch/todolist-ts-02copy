import {appActions} from "../features/CommonActions/App";
import {AxiosError} from "axios";
import {ResponseType} from "../api/types";


type thunkAPIType ={
    dispatch: (action: any) => any
    rejectWithValue: Function
}
export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: thunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = <D>(error: AxiosError, thunkAPI: thunkAPIType, showError = true) => {
    if (showError){
        thunkAPI.dispatch(appActions.setAppError({error: error.message? error.message : "Some error occurred"}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}