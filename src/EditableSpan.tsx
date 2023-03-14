import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false) // 2 состояния - true/false
    let [newTitle, setNewTitle] = useState(props.oldTitle)
    console.log(newTitle)

    const editHandler = () => {
        setEdit(!edit)
        addTask();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} autoFocus={true} onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    )
}

