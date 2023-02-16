import React from 'react';
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App from "./App";


export default {
    title: 'Application Component',
    component: App,
   decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return <App demo={true}/>

}