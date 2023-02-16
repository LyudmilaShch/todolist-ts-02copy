import { asyncActions as tasksAsyncActions} from './tasks-reducer'
import {asyncActions  as todolistsAsyncActions, slice} from './todolists-reducer'
import {TodolistList} from './Todolists'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
}

export {
    tasksActions,
    todolistsActions,
    TodolistList
}