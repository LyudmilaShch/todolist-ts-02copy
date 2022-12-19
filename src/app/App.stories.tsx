import React from 'react';
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App from "./App";


export default {
    title: 'App Component',
    component: App,
   decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action("Value changed");

export const AppBaseExample = (props: any) => {
    return <App demo={true}/>

}