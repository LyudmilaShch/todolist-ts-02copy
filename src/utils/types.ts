import {store} from "../app/store";
import {FieldErrorType} from "../api/types";
import {rootReducer} from "../app/reducers";


export type AppDispatchType = typeof store.dispatch

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }