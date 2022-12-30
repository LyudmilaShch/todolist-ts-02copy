import React, {useCallback, useEffect} from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/todoLists/Todolists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import {initializedAppTC, StatusType} from './app-reducer';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, StatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoginIn = useSelector<AppRootStateType, boolean> (state => state.auth.isLoginIn)
    const dispatch = AppDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized){
    return <div style={{position: "fixed", top: "30%", width: "100%", textAlign: "center"}}>
        <CircularProgress />
    </div>
}
    return (
        <BrowserRouter>

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

        </BrowserRouter>
    )
}


export default App;
