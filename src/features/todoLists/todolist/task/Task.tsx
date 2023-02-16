import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/editableSpan/EditanleSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/types";
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";


type TaskpropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskpropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions)

    const onRemoveHandler = useCallback(() => removeTask({
        taskId: props.task.id,
        todolistId: props.todolistId
    }), [props.task.id, props.todolistId]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId})
    }, [props.task.id, props.todolistId]);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        updateTask({taskId: props.task.id, model: {title: newValue}, todolistId: props.todolistId})
    }, [props.task.id, props.todolistId]);


    return <div key={props.task.id} className={props.task.status ? "is-done" : ""} style = {{position: 'relative'}}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler} />
        <IconButton onClick={onRemoveHandler} style = {{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>

    </div>
})