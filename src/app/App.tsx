import React, {useCallback, useEffect} from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/todoLists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./store";
import {asyncActions} from './app-reducer';
import {Route, Routes} from "react-router-dom";
import {Login, authSelectors} from "../features/Auth";
import {logoutTC} from "../features/Auth/auth-reducer";
import {useAppDispatch} from "../hooks/hooks";
import {isInitializedSelector, statusSelector} from "./selectors";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector(statusSelector)
    const isInitialized = useAppSelector(isInitializedSelector)
    const isLoginIn = useAppSelector(authSelectors.isLoginInSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo){
            dispatch(asyncActions.initializedAppTC())
        }
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
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
                    <Route path={"/login"} element={<Login />}/>
                    <Route path={"/"} element={<TodolistList demo={demo}/>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default App;
