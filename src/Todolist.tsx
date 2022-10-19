import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TodolistProps = {
    title: string,
    todolistId: string,
    xz?: number,
    tasks: Array<TasksType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTasksStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
    newValue: boolean
}


export const Todolist = (props: TodolistProps) => {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all")
    const onaAtiveClickHandler = () => props.changeFilter(props.todolistId, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed")
const removeTodolist = () => {
   props.removeTodolist(props.todolistId);
}
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
           <AddItemForm addTask={props.addTask} todolistId={props.todolistId}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(props.todolistId, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTasksStatus(props.todolistId, t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onaAtiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}


