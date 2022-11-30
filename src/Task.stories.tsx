import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const callback = action("Button 'add' was pressed inside the form");

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: "title"}}
            todolistId={'Todolist1'}
        />
        <Task
            task={{id: '2', isDone: false, title: "title2"}}
            todolistId={'Todolist2'}
        />
    </>
}