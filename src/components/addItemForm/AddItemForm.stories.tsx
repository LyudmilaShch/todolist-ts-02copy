import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const asyncCallBack = async(...params: any[]) =>{
    action("Button 'add' was pressed inside the form")(...params);
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={asyncCallBack}/>
}

export const AddItemFormDisabledBaseExample = (props: any) => {
    return <AddItemForm addItem={asyncCallBack} disabled={true}/>
}