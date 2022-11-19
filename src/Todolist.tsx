import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditanleSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";

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


export const Todolist = (props: TodolistProps) => {
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()



    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all")
    const onaAtiveClickHandler = () => props.changeFilter(props.todolistId, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed")
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId));
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle);
    }

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
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => {
                            const action = removeTaskAC(t.id, props.todolistId);
                            dispatch(action)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todolistId));
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.todolistId));
                        }


                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>

                        </div>
                    })
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
}


