import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import { TasksStateType } from '../AppWithRedux'
import {addTodolistAC, removeTodolistAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../api/todolists-API";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != "2")).toBeTruthy();
    // expect(endState['todolistId2'][0].id).toBe("1");
    // expect(endState['todolistId2'][1].id).toBe("3");
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].completed).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBeFalsy()
    expect(endState['todolistId1'][1].completed).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = changeTaskTitleAC('2', 'MilkyWay', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('MilkyWay')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ],
        'todolistId2': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
            {id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

