import {tasksReducer} from "../state/tasks-reducer";
import React from 'react';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import {todolistsReducer} from "../state/todolists-reducer";
import {AppRootState} from "../state/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-API";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists:[
        {id: 'todolistId1', title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: 'todolistId2', title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ],
    tasks:
        {
            ['todolistId1']: [
                {id: v1(), title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
                {id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
                {id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
            ],
            ['todolistId2']: [
                {id: v1(), title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
                {id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
                {id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
            ]
        }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
