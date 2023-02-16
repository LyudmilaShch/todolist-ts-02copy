import React, {useCallback, useEffect} from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/todoLists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {appActions} from '../features/Application';
import {Route, Routes} from "react-router-dom";
import {authSelectors, Login, authActions} from "../features/Auth";
import {isInitializedSelector, statusSelector} from "./selectors";
import {useActions, useAppSelector} from '../utils/redux-utils';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector(statusSelector)
    const isInitialized = useAppSelector(isInitializedSelector)
    const isLoginIn = useAppSelector(authSelectors.isLoginInSelector)

    const {logout} = useActions(authActions)
    const {initializedApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializedApp()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", width: "100%", textAlign: "center"}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoginIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/"} element={<TodolistList demo={demo}/>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default App;
