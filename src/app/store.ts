import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsTypes, tasksReducer} from "../features/todoLists/todolist/task/tasks-reducer";
import {TodolistActionsTypes, todolistsReducer} from "../features/todoLists/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ActionTypes, appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего app
export type AppActionsType = TodolistActionsTypes | TasksActionsTypes | ActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>
export const AppDispatch = () =>  useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;




