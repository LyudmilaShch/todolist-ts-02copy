import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const title1 = "What to learn"
  /*  const title2 = "Songs"*/

    /*    const tasks2 = [
            { id: 1, title: "Hello world", isDone: true, newValue: true },
            { id: 2, title: "I am Happy", isDone: false, newValue: true },
        ]*/
    let [tasks, setTasks]= useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true, newValue: true},
        {id: 2, title: "JS", isDone: true, newValue: true},
        {id: 3, title: "ReactJS", isDone: false, newValue: true},
        {id: 4, title: "Redux", isDone: false, newValue: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter( value: FilterValuesType){
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed"){
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active"){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (

        <div className="App">
            <Todolist title={title1}
                      xz={100200}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
            {/* <Todolist title={title2} tasks={tasks2}/>*/}
        </div>
    );
}


export default App;
