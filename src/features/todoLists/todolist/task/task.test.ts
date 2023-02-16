import {slice, TasksStateType} from "../../tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../../../api/types";
import { asyncActions } from "../../todolists-reducer";

const {reducer: tasksReducer} = slice
const {fetchTodolistsTC} = asyncActions

let startState: TasksStateType = {}


beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: false,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: true,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: false,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId3'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: false,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: true,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                completed: false,
                addedDate: '',
                order: 0,
                todoListId: 'todolistId3'
            },
        ]
    }
})

test('empty arrays should be added when we set todolists', () => {
    let payload = {
        todoLists: [
            {id: "todolistId1", title: "What to learn", order: 0, addedDate: ""},
            {id: "todolistId2", title: "What to buy", order: 0, addedDate: ""}
        ]
    }

    const action = fetchTodolistsTC.fulfilled(payload, 'requestId', undefined)

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId1']).toStrictEqual([])
    expect(endState['todolistId2']).toStrictEqual([])
})
