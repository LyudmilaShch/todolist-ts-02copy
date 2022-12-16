import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {AppDispatch, useAppSelector} from "./state/store";
import {TaskType} from "./api/todolists-API";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    console.log("AppWithRedux is called")
    const dispatch = AppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [dispatch])

    let removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistsTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    let changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistsTC(title)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(thunk);
    }, []);

    const changeStatus = useCallback(function (id: string, status: number, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }, []);

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, []);
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


                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist title={tl.title}
                                          key={tl.id}
                                          todolistId={tl.id}
                                          changeFilter={changeFilter}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTaskStatus={changeStatus}
                                          removeTask={removeTask}
                                          addTask={addTask}
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


export default AppWithRedux;
