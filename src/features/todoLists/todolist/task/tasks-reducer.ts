import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "../../todolists-reducer";
import {TaskPriorities, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../../api/todolists-API";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return ({...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]})
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, ...action.model}
                    : el
                )}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        case 'SET-TODOLIST': {
            const stateCopy = {...state};
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return { ...state,[action.todolistId]: action.tasks}
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then(res => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const action = addTaskAC(res.data.data.item);
            dispatch(action)
        })
}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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

// types
export type UpdateDomainTaskModelType = {
    title?: string | undefined
    description?: string | undefined
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string | undefined
    deadline?: string | undefined
}

export type TasksActionsTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

