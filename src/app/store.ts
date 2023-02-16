import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../features/todoLists";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../features/Application";
import {authReducer} from "../features/Auth";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});


//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})




// @ts-ignore
window.store = store;




