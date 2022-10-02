import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";

export type TodolistProps = {
    title: string,
    xz?: number,
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
    newValue: boolean
}


export const Todolist = (props: TodolistProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                props.addTask(newTaskTitle);
                setNewTaskTitle(" ");
            } else {
                setError("Title is required")
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle(" ");
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onaAtiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTasksStatus(t.id, e.currentTarget.checked);
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


