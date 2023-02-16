import {v1} from "uuid";
import {
    changeTodolistFilter, changeTodolistStatus, FilterValuesType, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {StatusType} from "../../app/app-reducer";
import {useActions} from "../../hooks/useActions";
import {todolistsActions} from "./index";
const {removeTodolistTC, addTodolistsTC, fetchTodolistsTC, changeTodolistTitleTC } = useActions(todolistsActions)

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({id: todolistId1}, 'requestId', 'todolistId1'))
    expect(endState.length).toBe(1);
})

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist"
    let payload = {
        todolist: {
            id: "todolistId1",
            title: newTodolistTitle,
            addedDate: "",
            order: 0
        }
    }
    const endState = todolistsReducer(startState, addTodolistsTC.fulfilled(payload, 'requestId', newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist"
    let payload ={ id: todolistId2, title: newTodolistTitle, }
    const action = changeTodolistTitleTC.fulfilled(payload, 'requestId', payload)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);

})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}
    ]
    const action = changeTodolistFilter({filter: newFilter, id: todolistId2})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

})

test('todolists should be set to the state', () => {

    let payload = {todoLists: startState};
    const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

    const endState = todolistsReducer([], action)

    expect(endState[0].filter).toBe("all");
    expect(endState.length).toBe(2);

})

test('correct entity status of todolist should be changed', () => {
    let newStatus: StatusType = "loading"

    const action = changeTodolistStatus({id: todolistId2, status: newStatus})

    const endState = todolistsReducer(startState, action)

    expect(endState[1].entityStatus).toBe('idle');
    expect(endState[0].entityStatus).toBe(newStatus);
})