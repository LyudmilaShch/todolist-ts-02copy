import {slice as todolistsSlice, asyncActions  as todolistsAsyncActions} from './todolists-reducer'
import {slice as tasksSlice, asyncActions as tasksAsyncActions} from './tasks-reducer'
import {TodolistList} from './Todolists'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    tasksActions,
    todolistsActions,
    TodolistList,
    todolistsReducer,
    tasksReducer
}