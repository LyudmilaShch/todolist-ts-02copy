import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-API";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type updateTaskActionType = {
    type: "UPDATE-TASK",
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string
    todolistId: string
}
export type setTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}


export type TasksActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | updateTaskActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | setTasksActionType

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            let task = action.task;
            // const stateCopy = {...state};
            // let tasks = stateCopy[action.todolistId]
            // let newTasks = [task, ...tasks];
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy
            return ({...state, [task.todoListId]: [task, ...state[task.todoListId]]})
        }
        case 'UPDATE-TASK': {
            debugger
            return ({
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, ...action.model}
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
            stateCopy[action.todolist.id] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        case 'SET-TODOLIST': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): updateTaskActionType => {
    return {type: "UPDATE-TASK", taskId, model, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): setTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (id: string, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.deleteTask(todolistId, id)
            .then(res => {
                const action = removeTaskAC(id, todolistId);
                dispatch(action);
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                const action = addTaskAC(res.data.data.item);
                dispatch(action)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string | undefined
    description?: string | undefined
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string | undefined
    deadline?: string | undefined
}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === id)
        if (!task) {
            console.warn("task not fount in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, id, apiModel)
            .then(res => {
                const action = updateTaskAC(id, domainModel, todolistId);
                dispatch(action)
            })
    }
}

