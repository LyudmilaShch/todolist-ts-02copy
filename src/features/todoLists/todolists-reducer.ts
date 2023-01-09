import {todolistsAPI, TodolistType} from "../../api/todolists-API";
import {AppThunk} from "../../app/store";
import {setAppStatusAC, StatusType} from "../../app/app-reducer";
import {handleServerNetworkAppError} from "../../utils/errorUtils";

const initialState: Array<TodolistDomainType> = []



export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todoLists.map(tl => {return {...tl,filter: 'all', entityStatus: "idle"}})
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (title: string, id: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter} as const)
export const setTodolistAC = (todoLists: Array<TodolistType>) => ({type: "SET-TODOLIST", todoLists} as const)
export const changeTodolistStatusAC = (id: string, status: StatusType) =>
    ({type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkAppError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodolistStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolistTitle(todolistId, newTitle)
        .then(res => {
            dispatch(changeTodolistTitleAC(newTitle, todolistId))
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

export type TodolistActionsTypes =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistStatusAC>
    | SetTodolistActionType
