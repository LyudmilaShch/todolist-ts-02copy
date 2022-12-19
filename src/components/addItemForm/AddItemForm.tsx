import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:  boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }

        addItem(newTaskTitle.trim());
        setNewTaskTitle(" ");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                addItem(newTaskTitle);
                setNewTaskTitle(" ");
            } else {
                setError("Title is required")
            }
        }
    }
    return <div>
        <TextField value={newTaskTitle}
                   variant={'outlined'}
                   label={"Type value"}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
                   disabled={disabled}

        />
        <IconButton onClick={addTaskHandler} color={"primary"} disabled={disabled}>
            <ControlPoint />
        </IconButton>


    </div>
});