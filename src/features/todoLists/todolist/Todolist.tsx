import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditanleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AppDispatch, useAppSelector} from "../../../app/store";
import {fetchTasksTC} from "./task/tasks-reducer";
import {Task} from "./task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-API";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";

export type TodolistProps = {
    todolist: TodolistDomainType
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (id: string, status: number, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistProps) => {
    console.log("Todolist is called")

    const tasks = useAppSelector<Array<TaskType>>(state => state.tasks[props.todolist.id])
    const dispatch = AppDispatch()





    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id);
    }, [props.removeTodolist, props.todolist.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const changeTodolistTitle = useCallback((newTitle: string) => {

        props.changeTodolistTitle(props.todolist.id, newTitle);
    }, [props.changeTodolistTitle, props.todolist.id])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status  === TaskStatuses.New)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        todolistId={props.todolist.id}
                        key={t.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </ul>
            <div>
                <Button
                    variant={props.todolist.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})

