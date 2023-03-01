import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../features/todoLists";
import {appReducer} from "../features/Application";
import {authReducer} from "../features/Auth";

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});