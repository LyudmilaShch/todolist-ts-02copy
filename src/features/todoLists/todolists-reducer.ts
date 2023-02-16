import {todolistsAPI} from "../../api/todolists-API";
import {StatusType} from "../Application";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/errorUtils";
import {TodolistType} from "../../api/types";
import {ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/App";


const {setAppStatus} = appActions

const fetchTodolistsTC = createAsyncThunk<{todoLists: TodolistType[]}, undefined, ThunkError>('todolists/fetchTodolists', async (param,thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: res.data}
    } catch (error: any) {
       return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const removeTodolistTC = createAsyncThunk<{id: string}, string, ThunkError>('todolists/removeTodolist', async (todolistId, {
    dispatch
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistStatus({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id: todolistId}
})
const addTodolistsTC = createAsyncThunk<
    {todolist: TodolistType}, string, ThunkError
>('todolists/addTodolists', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }

})
const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',
    async (param: {id: string, title: string}, thunkAPI) => {
        try {
            const res = await todolistsAPI.updateTodolistTitle(param.id, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return {title: param.title, id: param.id}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncServerNetworkError(error, thunkAPI, false)
        }

})

export const asyncActions = {
    removeTodolistTC, addTodolistsTC, setAppStatusAC: setAppStatus, changeTodolistTitleTC, fetchTodolistsTC
}
export const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodolistStatus: (state, action: PayloadAction<{ id: string, status: StatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1)
            }
        })
            .addCase(addTodolistsTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title
        });
    }
})
export const {
    changeTodolistFilter,
    changeTodolistStatus
} = slice.actions


// types
export type FilterValuesType = "all" | "completed" | "active";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

