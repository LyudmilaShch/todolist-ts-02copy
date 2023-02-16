import {createAction} from "@reduxjs/toolkit";
import {StatusType} from "../Application/application-reducer";

const setAppStatus = createAction<{ status: StatusType }>('common/setAppStatus')
const setAppError = createAction<{ error: string | null }>('common/setAppError')

export const appActions = {
    setAppStatus,
    setAppError
}
