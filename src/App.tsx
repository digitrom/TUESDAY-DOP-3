import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

// type TodolistsType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

type ObjectType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    students: Array<string>
    todolistID: string
}

type todoFromServerType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    students: Array<string>
}

export type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}

function App() {

    // let todolistID1=v1();
    // let todolistID2=v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, setTasks] = useState({
    //     [todolistID1]:[
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]:[
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    let todoFromServer: todoFromServerType[] = [
        {
            title: "What to learn",
            filter: "all",
            tasks: [
                {taskID: v1(), title: "HTML&CSS", isDone: true},
                {taskID: v1(), title: "JS", isDone: true}
            ],
            students: [
                'Rick Kane',
                'Isac Morton',
                'Dominika Field',
                'Thalia Park'
            ]
        },
        {
            title: "What to learn",
            filter: "all",
            tasks: [
                {taskID: v1(), title: "HTML&CSS", isDone: true},
                {taskID: v1(), title: "JS", isDone: true}
            ],
            students: [
                'Rick Kane',
                'Isac Morton',
                'Dominika Field',
                'Thalia Park'
            ]
        }]

    const [todo, setTodo] = useState<Array<ObjectType>>([])


    useEffect(() => {
        setTodo(todoFromServer.map(el => ({...el, todolistID: v1()})))
    }, [])

    const removeTodolist = (todolistIDCurrent: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistID))
        // delete tasks[todolistID]
        setTodo(todo.filter(el => el.todolistID !== todolistIDCurrent))
    }

    function removeTask(todolistIDCurrent: string, taskID: string) {
        // // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)});
        setTodo(todo.map(tl => tl.todolistID === todolistIDCurrent ? {
            ...tl,
            tasks: tl.tasks.filter(t => t.taskID !== taskID)
        } : tl))
    }

    function addTask(todolistIDCurrent: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // console.log(tasks, todolistID)
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
        // // let newTasks = [task, ...tasks];
        // // setTasks(newTasks);
        let newTask = {taskID: v1(), title: title, isDone: false};
        setTodo(todo.map(tl => tl.todolistID === todolistIDCurrent
            ? {...tl, tasks: [...tl.tasks, newTask]}
            : tl
        ))
    }


    const updateTask = (todolistIDCurrent: string, taskID: string, newTitle: string) => {
        // console.log(newTitle)
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        // })
    }

    const updateTodolist = (todolistIDCurrent: string, newTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    const addTodolist = (newTitle: string) => {
        // const newID = v1()
        // const newTodo: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        // setTodolists([...todolists, newTodo])
        // setTasks({...tasks, [newID]: []})
    }

    function changeStatus(todolistIDCurrent: string, taskId: string, newIsDone: boolean) {

        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        // })
        setTodo(todo.map(el => el.todolistID === todolistIDCurrent
            ? {...el, tasks: el.tasks.map(t => t.taskID === taskId ? {...t, isDone: newIsDone} : t)}
            : el))
    }

    function changeFilter(todolistIDCurrent: string, valueFilter: FilterValuesType) {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el))

        setTodo(todo.map(el => el.todolistID === todolistIDCurrent
            ? {...el, filter:valueFilter}
            : el
        ))
    }

    return (
        <div className="App">
            < AddItemForm callBack={addTodolist}/>
            {todo.map(tl => {
                let tasksForTodolist = tl.tasks

                if (tl.filter === "active") {
                    tasksForTodolist = tl.tasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tl.tasks.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        todolistID={tl.todolistID}
                        key={tl.todolistID}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
