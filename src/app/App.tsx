import React from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/todoLists/Todolists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {StatusType} from './app-reducer';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, StatusType>((state) => state.app.status)


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
                        <Button color="inherit">Login</Button>
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
