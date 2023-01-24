import {appReducer, setAppErrorAC, setAppStatusAC, StatusType} from "./app-reducer";

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
    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test ('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))
    expect(endState.status).toBe('loading');
})