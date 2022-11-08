import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    idDone: false,
    todolistId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string
    todolistId: string
}

type ActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            let task = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            // const stateCopy = {...state};
            // let tasks = stateCopy[action.todolistId]
            // let newTasks = [task, ...tasks];
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy
            return ({...state, [action.todolistId]: [task, ...state[action.todolistId]]})
        }
        case 'CHANGE-TASK-STATUS': {
            return ({
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, isDone: action.idDone}
                    : el
                )
            })
        }
        case 'CHANGE-TASK-TITLE': {
            return ({
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, title: action.title}
                    : el
                )
            })
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];

            return stateCopy
        }
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, idDone: false, todolistId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, idDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}