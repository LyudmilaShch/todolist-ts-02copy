import React, {useCallback, useEffect} from "react";
import {
    TodolistDomainType
} from "./todolists-reducer";
import {Grid} from "@material-ui/core";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import {useAppDispatch} from "../../hooks/hooks";
import {Navigate} from 'react-router-dom';
import {isLoginInSelector} from "../Auth/selectors";
import {tasksActions, todolistsActions} from "./index";
import {useActions, useAppSelector} from "../../utils/redux-utils";


type TodoListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodoListPropsType> = ({demo = false}) => {
    const isLoginIn = useAppSelector(isLoginInSelector)
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    const {removeTask, updateTask} = useActions(tasksActions)
    const {
        fetchTodolistsTC,
        addTodolistsTC
    } = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    const addTodolistCallBack = useCallback(async (title: string, helper?: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.addTodolistsTC(title)
        const resultAction = await dispatch(thunk);

        if (todolistsActions.addTodolistsTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length){
                const errorMessage = resultAction.payload?.errors[0];
                helper?.setError(errorMessage)
            } else {
                helper?.setError("Some error occured")
            }
        } else {
            helper?.setNewTaskTitle('')
        }
    }, [])

    useEffect(() => {
        if (!demo) {
            fetchTodolistsTC()
        }
    }, [])



    if (!isLoginIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolistCallBack}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {todolists.map((tl) => {

                    return <Grid item key={tl.id}>
                        <div style={{width: "300px"}}>
                            <Todolist
                                todolist={tl}
                                key={tl.id}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })}
            </Grid>
        </>
    )
}