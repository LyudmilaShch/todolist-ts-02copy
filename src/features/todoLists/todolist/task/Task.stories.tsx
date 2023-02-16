import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../stories/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../../../../api/types";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const callback = action("Button 'add' was pressed inside the form");

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            task={{
                id: '1', completed: true, title: "title", status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', addedDate: '', order: 0, todoListId: 'todolistId1'
            }}
            todolistId={'Todolist1'}
       />
        <Task
            task={{
                id: '2', completed: false, title: "title2", status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', description: '', addedDate: '', order: 0, todoListId: 'todolistId1'
            }}
            todolistId={'Todolist2'}
        />
    </>
}