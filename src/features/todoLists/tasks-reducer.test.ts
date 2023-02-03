import {
    addTaskAC,
    tasksReducer,
    updateTaskAC,
    TasksStateType, fetchTasksTC, removeTaskTC
} from './todolist/task/tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-API";

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


test('correct task should be deleted from correct array', () => {
let param = {taskId: '2', todolistId: 'todolistId2'}
    const action = removeTaskTC.fulfilled(param, 'requestId', param)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != "2")).toBeTruthy();
    // expect(endState['todolistId2'][0].id).toBe("1");
    // expect(endState['todolistId2'][1].id).toBe("3");
})

test('correct task should be added to correct array', () => {
    let task = {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exists",
        completed: false,
        description: " "
    };
    const action = addTaskAC(task)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].completed).toBe(false)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskId: '2', model: {completed: false}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBeFalsy()
    expect(endState['todolistId1'][1].completed).toBeTruthy()
})

// test('title of specified task should be changed', () => {
//     const action = changeTaskTitleAC('2', 'MilkyWay', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].title).toBe('MilkyWay')
//     expect(endState['todolistId1'][1].title).toBe('JS')
// })

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
            todolist: {
                id: "blabla",
                title: 'new todolist',
                addedDate: "",
                order: 0
            }
        }
    )

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


    const action = removeTodolistAC({id: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


test('empty arrays should be added when we set todolists', () => {


    const action = setTodolistAC({
        todoLists: [
            {id: "todolistId1", title: "What to learn", order: 0, addedDate: ""},
            {id: "todolistId2", title: "What to buy", order: 0, addedDate: ""}
        ]
    })

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId1']).toStrictEqual([])
    expect(endState['todolistId2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {


    const action = fetchTasksTC.fulfilled({
        tasks: startState["todolistId1"],
        todolistId: "todolistId1"
    }, 'requestId', "todolistId1")
    // const action = setTasksAC({ tasks: startState["todolistId1"], todolistId: "todolistId1" } )

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})

