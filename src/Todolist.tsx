import React, {useCallback} from 'react';
import './App.css';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditanleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


export type TodolistProps = {
    title: string,
    todolistId: string,
    xz?: number,
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
    newValue?: boolean
}


export const Todolist = React.memo((props: TodolistProps) => {
    console.log("Todolist is called")
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()


    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId]);
    const onaAtiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId));
    }, [props.todolistId])

    const changeTodolistTitle = useCallback((newTitle: string) => {

        props.changeTodolistTitle(props.todolistId, newTitle);
    }, [props.changeTodolistTitle, props.todolistId])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        todolistId={props.todolistId}
                        key={t.id}
                    />)
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onaAtiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})

