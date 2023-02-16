import {appReducer, StatusType} from "./index";
import {appActions} from "../CommonActions/App";

let startState:  {
    status: StatusType
    error: null | string
    isInitialized: boolean
}
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})


test ('correct error message should be set', () => {
    const endState = appReducer(startState, appActions.setAppError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test ('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})