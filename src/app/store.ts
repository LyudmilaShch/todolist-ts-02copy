import {combineReducers} from "redux";
import {TasksActionsTypes, tasksReducer} from "../features/todoLists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../features/todoLists/todolists-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk"

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего app
export type AppActionsType = TasksActionsTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = typeof store.dispatch

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>
export const AppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})


// @ts-ignore
window.store = store;




