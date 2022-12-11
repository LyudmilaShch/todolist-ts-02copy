import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType} from "./api/todolists-API";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    console.log("AppWithRedux is called")
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [dispatch])

    let removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    let changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

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
                                          xz={100200}
                                          changeFilter={changeFilter}
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


export default AppWithRedux;
