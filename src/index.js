import React, { useEffect } from 'react'
const { useState } = require("react");
const { render } = require("react-dom");
let id = 0;
const App = () => {

    const [todos, seTodos] = useState(()=>{if(window.localStorage.getItem("Todo")){
        if (JSON.parse(window.localStorage.getItem("Todo"))){
            return JSON.parse(window.localStorage.getItem("Todo"));
        }
        return []
    }
    return []});
    const [todoText, seTodoText] = useState("");
    const [editText, setEditText] = useState("");
    const [preEditText, setPreEditText] = useState(editText);
    
    const AddToDo = () => {
        id = id + 1;
        seTodos([...todos, {ind:id, task:todoText, editval: false, taskStatus: 0}]);
        // window.localStorage.setItem("Todo", JSON.stringify(todos));
        seTodoText("");
    }

    const onDelete = (todoID) => {
        seTodos(todos.filter(todo=>todo.ind!==todoID));
        // window.localStorage.setItem("Todo",todos);
    }

    const Edit = (td) => {
        (td.editval)?
        seTodos(todos.map((todo)=>{
            setPreEditText(editText);
            return (
                (todo.ind===td.ind)?{...todo, task : (editText), editval : (!td.editval)}:{...todo}
            )
        })):
        seTodos(todos.map((todo)=>{
            return (
                (todo.ind===td.ind)?{...todo, editval : (!td.editval)}:{...todo}
            )
        }));
        setEditText("");
        // (td.editval)?
        // window.localStorage.setItem("Todo",todos):
        // window.localStorage.setItem("Todo",todos);
    }

    const taskDone = (td) => {
        seTodos(todos.map((todo)=>{
            return (
                (todo.ind===td.ind)?{...todo, taskStatus : (!td.taskStatus)}:{...todo}
            )
        }));
        // window.localStorage.setItem("Todo",todos);
    }

    useEffect(()=>{
        window.localStorage.setItem("Todo",JSON.stringify(todos));
    }, [todos]);

    return (
        <>
        <input key = "Input-Box" type="text" value={todoText} onChange={(e)=>{seTodoText(e.target.value)}}></input>
        <button type='submit' onClick={AddToDo}>Add</button>
        {todos.map( (todo)=>{
            return (
                <p key = {todo.ind}>
                    {
                    (todo.taskStatus)?
                    (<input type="checkbox" onClick={()=>{taskDone(todo)}} checked></input>):
                    (<input type="checkbox" onClick={()=>{taskDone(todo)}}></input>)
                    }
                    &emsp;
                    <button onClick={()=>{onDelete(todo.ind)}}>
                        Delete
                    </button>&emsp;
                    <button onClick={()=>{Edit(todo)}}>
                    {
                    (todo.editval)?
                    ("Done"):
                    ("Edit")
                    }
                    </button>&emsp;
                    {
                    (todo.editval)?
                    (<input type="text" key = "Edit-Box" value={editText} onChange={(e)=>{setEditText(e.target.value)}}></input>):
                    ((todo.taskStatus)?
                    (<s>{todo.task}</s>):
                    (todo.task))
                    }
                </p>
            )
        }
        )}
        </>
    );
}

render(<App />, document.getElementById("root"));