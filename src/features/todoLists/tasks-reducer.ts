import {FieldErrorType, TaskPriorities, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-API";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/errorUtils";
import {AppRootStateType} from "../../app/store";
import {asyncActions as asyncTodolistActions} from './todolists-reducer'

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks: res.data.items, todolistId: todolistId}
})
export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})
export const addTask = createAsyncThunk<
    TaskType, { title: string, todolistId: string },
    {
        rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
    }
>('tasks/addTask', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch, false)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        const state = getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue("task not fount in the state")
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
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error: any) {
            handleServerNetworkAppError(error, dispatch)
            return rejectWithValue(null)
        }
    })

export const asyncActions = {
    fetchTasks, removeTask, addTask, updateTask
}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodolistActions.addTodolistsTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(asyncTodolistActions.removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(asyncTodolistActions.fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer;

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

