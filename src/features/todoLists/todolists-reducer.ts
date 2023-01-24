import {todolistsAPI, TodolistType} from "../../api/todolists-API";
import {AppThunk} from "../../app/store";
import {setAppStatusAC, StatusType} from "../../app/app-reducer";
import {handleServerNetworkAppError} from "../../utils/errorUtils";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id != action.payload.id);
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ title: string, id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        setTodolistAC: (state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistStatusAC: (state, action: PayloadAction<{ id: string, status: StatusType }>) => {
            const index = state.findIndex(tl => tl.id != action.payload.id);
            state[index].entityStatus = action.payload.status
        }

    }
})
export const todolistsReducer = slice.reducer;
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistAC,
    changeTodolistStatusAC
} = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkAppError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id: todolistId, status: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(todolistId, newTitle)
        .then(res => {
            dispatch(changeTodolistTitleAC({title: newTitle, id: todolistId}))
        })
}

// types
export type FilterValuesType = "all" | "completed" | "active";
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

