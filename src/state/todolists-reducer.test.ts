import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, SetTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ]
})


test ('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);

})

test ('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test ('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist"

    const action = changeTodolistTitleAC(newTodolistTitle, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);

})

test ('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ]
    const action = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

})

test ('todolists should be set to the state', () => {

    const action = SetTodolistAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState[0].filter).toBe("all");
    expect(endState.length).toBe(2);

})