import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setNewTaskTitle: (newTaskTitle: string) => void }

type AddItemFormPropsType = {
    addItem: (title: string, helper?: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const addTaskHandler = async () => {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim(), {setError, setNewTaskTitle});

        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
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
        <IconButton onClick={addTaskHandler} color={"primary"} disabled={disabled} style={{marginLeft: '5px'}}>
            <ControlPoint/>
        </IconButton>


    </div>
});