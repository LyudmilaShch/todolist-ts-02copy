import {todolistsAPI, TodolistType} from "../api/todolists-API";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";


export type FilterValuesType = "all" | "completed" | "active";
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLIST',
    todolists: Array<TodolistType>,

}

export type TodolistActionsTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "all"
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            debugger
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }

            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }

            return [...state]
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todolist}
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
export const SetTodolistAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
    return {type: "SET-TODOLIST", todolists}
}

//thunks

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(SetTodolistAC(res.data))
    } catch {
        throw new Error("Error fetch todolists TC")
    }

}

export const removeTodolistsTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistsTC = (title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => {
    debugger
    return (dispatch) => {
        todolistsAPI.updateTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(newTitle, todolistId))
            })
    }
}
