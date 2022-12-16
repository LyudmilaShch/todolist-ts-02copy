import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsTypes, tasksReducer} from "./tasks-reducer";
import {TodolistActionsTypes, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего app
export type AppActionsType = TodolistActionsTypes | TasksActionsTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>
export const AppDispatch = () =>  useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;




