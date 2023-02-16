import {todolistsAPI} from "../../api/todolists-API";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {appActions} from "../CommonActions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils";

import {asyncActions as asyncTodolistActions} from './todolists-reducer'
import {TaskPriorities, TaskType, UpdateTaskModelType} from "../../api/types";
import {AppRootStateType, ThunkError} from "../../utils/types";

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>
('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try{
        const res = await todolistsAPI.getTasks(todolistId)
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId: todolistId}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>
('tasks/removeTask', async (param, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})
export const addTask = createAsyncThunk< TaskType, { title: string, todolistId: string }, ThunkError>
('tasks/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
           // return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)

    }
})
export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue("task not fount in the state")
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.model
        }
        try {
            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                return param
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

export const asyncActions = {
    fetchTasks, removeTask, addTask, updateTask
}

export const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodolistActions.addTodolistsTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
            .addCase(asyncTodolistActions.removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
            .addCase(asyncTodolistActions.fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
            .addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
            .addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
            .addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        })
            .addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

// types
export type UpdateDomainTaskModelType = {
    title?: string | undefined
    description?: string | undefined
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string | undefined
    deadline?: string | undefined
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

