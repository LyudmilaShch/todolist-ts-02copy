import {FieldErrorType, todolistsAPI, TodolistType} from "../../api/todolists-API";
import {setAppStatusAC, StatusType} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/errorUtils";
import {AxiosError} from "axios";


const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoLists: res.data}
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {
    dispatch
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatus({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})
const addTodolistsTC = createAsyncThunk<
    {todolist: TodolistType}, string,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
>('todolists/addTodolists', async (title, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkAppError(error, dispatch, false)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }

})
const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {
    id: string, title: string
}, {}) => {
    await todolistsAPI.updateTodolistTitle(param.id, param.title)
    return {title: param.title, id: param.id}
})

export const asyncActions = {
    removeTodolistTC, addTodolistsTC, setAppStatusAC, changeTodolistTitleTC, fetchTodolistsTC
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
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title
        });
    }
})
export const todolistsReducer = slice.reducer;
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

