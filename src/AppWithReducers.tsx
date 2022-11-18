import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true, newValue: true},
            {id: v1(), title: "JS", isDone: true, newValue: true},
            {id: v1(), title: "ReactJS", isDone: false, newValue: true},
            {id: v1(), title: "Redux", isDone: false, newValue: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: true, newValue: true},
            {id: v1(), title: "milk", isDone: true, newValue: false}
        ]
    })
    function removeTask(todolistId: string, id: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTaskReducer(action)
    }

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTaskReducer(action);
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTaskReducer(action);
    }

    function changeTaskTitle(id: string, newValue: string, todolistId: string) {
        dispatchToTaskReducer(changeTaskTitleAC(id, newValue, todolistId));
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistReducer(changeTodolistFilterAC(value, todolistId));
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        dispatchToTaskReducer(action)
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(newTitle, todolistId))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTaskReducer(action)
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist title={tl.title}
                                          key={tl.id}
                                          todolistId={tl.id}
                                          xz={100200}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTasksStatus={changeStatus}
                                          changeTasksTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>

                {/* <Todolist title={title2} tasksObj={tasks2}/>*/
                }
            </Container>
        </div>
    )
        ;
}


export default AppWithReducers;
