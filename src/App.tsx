import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    const title1 = "What to learn"
    /*  const title2 = "Songs"*/

    /*    const tasks2 = [
            { id: 1, title: "Hello world", isDone: true, newValue: true },
            { id: 2, title: "I am Happy", isDone: false, newValue: true },
        ]*/

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== id)})

        /*   let tasks = tasksObj[todolistId];
           let filteredTasks = tasks.filter(t => t.id !== id);
           tasksObj[todolistId] = filteredTasks;
           setTasks({...tasksObj});*/
    }

    function addTask(todolistId: string, title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false,
            newValue: true
        };
        setTasks({...tasksObj, [todolistId]: [task, ...tasksObj[todolistId]]})


        // let task = {
        //     id: v1(),
        //     title: title,
        //     isDone: false,
        //     newValue: true
        // };
        // let tasks = tasksObj[todolistId];
        // let newTasks = [task, ...tasks];
        // tasksObj[todolistId] = newTasks
        // setTasks({...tasksObj});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })

        // let tasks = tasksObj[todolistId];
        // let task = tasks.find( (t) => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks({...tasksObj});
        // }
    }

    function changeTaskTitle(id: string, newValue: string, todolistId: string) {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === id ? {...el, title: newValue} : el)
        })

    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))

// let todolist = todolists.find(tl => tl.id === todolistId);
// if (todolist) {
//     todolist.filter = value;
//     setTodolists([...todolists]);
//}
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))

        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }

    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true, newValue: true},
            {id: v1(), title: "JS", isDone: true, newValue: true},
            {id: v1(), title: "ReactJS", isDone: false, newValue: true},
            {id: v1(), title: "Redux", isDone: false, newValue: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: true, newValue: true},
            {id: v1(), title: "milk", isDone: true, newValue: false}
        ]
    })

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (

        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }

                        return <Grid item>
                            <Paper style={{ padding: "10px"}}>
                                <Todolist title={tl.title}
                                          key={tl.id}
                                          todolistId={tl.id}
                                          xz={100200}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTasksStatus={changeStatus}
                                          changeTasksTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>

                {/* <Todolist title={title2} tasksObj={tasks2}/>*/
                }
            </Container>
        </div>
    )
        ;
}


export default App;
