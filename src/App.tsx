import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType={
    id: string
    title: string,
    filter: FilterValuesType
}

function App() {
    const title1 = "What to learn"
    /*  const title2 = "Songs"*/

    /*    const tasks2 = [
            { id: 1, title: "Hello world", isDone: true, newValue: true },
            { id: 2, title: "I am Happy", isDone: false, newValue: true },
        ]*/

    function removeTask(todolistId: string, id: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(todolistId: string, title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false,
            newValue: true
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find( (t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
let todolist = todolists.find(tl => tl.id === todolistId);
if (todolist) {
    todolist.filter = value;
    setTodolists([...todolists]);
}
    }

   let  todolistId1 = v1();
   let  todolistId2 = v1();

    let [todolists, setTodolists]  = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
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

    return (

        <div className="App">
            <AddItemForm addTask={()=>{}} todolistId={"wss"}/>

            {todolists.map((tl) => {

                let tasksForTodolist = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }

                return <Todolist title={tl.title}
                                 key = {tl.id}
                                 todolistId = {tl.id}
                                 xz={100200}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTasksStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodolist={removeTodolist}
                />

            })}


            {/* <Todolist title={title2} tasksObj={tasks2}/>*/}
        </div>
    );
}


export default App;
