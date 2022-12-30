import React, {useCallback, useEffect} from "react";
import {AppDispatch, AppRootStateType, useAppSelector} from "../../app/store";
import {
    addTodolistsTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./todolist/task/tasks-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

type TodoListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodoListPropsType> = ({demo = false}) => {
    const dispatch = AppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    const isLoginIn = useSelector<AppRootStateType, boolean> (state => state.auth.isLoginIn)

    useEffect(() => {
        if (demo  || !isLoginIn) {
            return
        }
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

    if(!isLoginIn){
        return <Navigate to={"/login"}/>
    }
    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {

                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                key={tl.id}
                                changeFilter={changeFilter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeStatus}
                                removeTask={removeTask}
                                addTask={addTask}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}