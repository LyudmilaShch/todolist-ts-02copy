import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle(" ");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                props.addItem(newTaskTitle);
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

        />
        <IconButton onClick={addTask} color={"primary"}>
            <ControlPoint />
        </IconButton>


    </div>
}