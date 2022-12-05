import React, {useEffect, useState} from 'react'
import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-API";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTodolist}>create todolist</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
   const deleteTodolist = () => {
       todolistsAPI.deleteTodolist(todolistId)
           .then((res) => {
               debugger
               setState(res.data)
           })
   }
     return <div>{JSON.stringify(state)}
         <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
             setTodolistId(e.currentTarget.value)
         }}/>
         <button onClick={deleteTodolist}>delete todolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <br />
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTodolistTitle}>update todolist title</button>

    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const createTask = () => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <br/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTaskTitle = () => {
        todolistsAPI.updateTaskTitle(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <br/>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTaskTitle}>update task title</button>

    </div>
}
//
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistId, setTodolistId] = useState<any>(null)
//     const [taskId, setTaskId] = useState<any>(null)
//     const [task, setTask] = useState<any>(null)
//
//     const getTask = () => {
//         todolistsAPI.getTasks(todolistId)
//             .then((res) => {
//                 setState(res.data)
//                 setTask(state.find((el: { id: any; }) => el.id === taskId))
//             })
//     }
//
//    const updateTask = () => {
//        todolistsAPI.updateTask(todolistId, taskId, task)
//            .then((res) => {
//                setState(res.data)
//            })
//    }
//     return <div>{JSON.stringify(state)}
//         <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
//             setTodolistId(e.currentTarget.value)
//         }}/>
//         <input placeholder={'taskId'} value={taskId} onChange={(e) => {
//             setTaskId(e.currentTarget.value)
//         }}/>
//         <input placeholder={'title'} value={task.title} onChange={(e) => {
//             setTask({...task, title: e.currentTarget.value})
//         }}/>
//
//         <button onClick={getTask}>get task</button>
//         <div>{JSON.stringify(task)}</div>
//     </div>
// }