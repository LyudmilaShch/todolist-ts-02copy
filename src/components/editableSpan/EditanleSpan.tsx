import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsEditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: PropsEditableSpanType) => {
    let  [editMode, setEditMode] = useState(false)
    let  [title, setTitle] = useState('')
   const activateEditMode = () => {
       setEditMode(true);
       setTitle(props.title)
   }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return editMode
        ? <TextField value={title} onChange={onChangeTitle} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title} </span>
})