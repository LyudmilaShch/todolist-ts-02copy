import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm, AddItemFormSubmitHelperType} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditanleSpan";
import {Button, IconButton, Paper, PropTypes} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./task/Task";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {tasksActions, todolistsActions} from "../index";
import {useAppDispatch} from "../../../hooks/hooks";
import {TaskStatuses, TaskType} from "../../../api/types";
import {useActions, useAppSelector} from '../../../utils/redux-utils';

export type TodolistProps = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistProps) => {
    const tasks = useAppSelector<Array<TaskType>>(state => state.tasks[props.todolist.id])
    const {fetchTasks} = useActions(tasksActions)
    const {
        changeTodolistFilter, removeTodolistTC, changeTodolistTitleTC
    } = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilter({
        filter: filter,
        id: props.todolist.id
    }), [props.todolist.id]);

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id);
    }
    const addTaskCallBack = useCallback(async (title: string, helper?: AddItemFormSubmitHelperType) => {
        let thunk = tasksActions.addTask({title: title, todolistId: props.todolist.id})
        const resultAction = await dispatch(thunk);

        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length){
                const errorMessage = resultAction.payload?.errors[0];
                helper?.setError(errorMessage)
            } else {
                helper?.setError("Some error occured")
            }
        } else {
            helper?.setNewTaskTitle('')
        }
    }, [props.todolist.id])

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(props.todolist.id)
    }, [])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: newTitle});
    }, [props.todolist.id])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }

    const renderFilterButton = (color: PropTypes.Color,
                                buttonFilter: FilterValuesType,
                                text: string) => {
        return <Button
            variant={props.todolist.filter === buttonFilter ? "contained" : "text"}
            onClick={() => onFilterButtonClickHandler(buttonFilter)}
            color={color}>{text}
        </Button>
    }

    return (
        <Paper  style={{padding: '10px', position:'relative'}}>
            <IconButton size={'small'} onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}
            style={{position:'absolute', right: '3px', top:'3px'}}>
                <Delete fontSize={'small'}/>
            </IconButton>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        todolistId={props.todolist.id}
                        key={t.id}
                    />)
                }
                {!tasksForTodolist.length && <div style={{padding:'10px', color:'gray'}}>No tasks</div> }
            </ul>
            <div>
                {renderFilterButton('default', 'all', 'All')}
                {renderFilterButton('primary', 'active', 'Active')}
                {renderFilterButton('secondary', 'completed', 'Completed')}
            </div>
        </Paper>
    );
})
