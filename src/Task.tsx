import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditanleSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./Todolist";

type TaskpropsType = {
    task: TasksType
    todolistId: string
}
export const Task = React.memo((props: TaskpropsType) => {
    const dispatch = useDispatch()
    const onRemoveHandler = () => {
        const action = removeTaskAC(props.task.id, props.todolistId);
        dispatch(action)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId));
    }
    const onChangeTitleHandler = useCallback( (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },[props.task.id, props.todolistId])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>

    </div>
})