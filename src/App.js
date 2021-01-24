import "./components/Header.js"
import Header from "./components/Header.js";
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import { useState, useEffect } from 'react';
import React from 'react'

function App() {
    const [visibleAddTask, setVisibleAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      const getTasks = async () => {
          const tasksFromServer = await fetchTasks();
          setTasks(tasksFromServer)
      }

      getTasks();
    }, [])

    // fetch tasks 
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json();

        return data
    }

    // fetch single task to toggle the reminder 
    const fetchTask = async id => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json();

        return data
    }       

    // Add Task 
    const addTask = async task => {
        const res =  await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
        // console.log(tasks)

        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = {id, ...task};

        // setTasks([...tasks, newTask])
    } 
    
    // delete Task 
    const deleteTask = async id => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE' 
        })

        setTasks(tasks.filter(task => task.id !== id))
    }

    // toggle reminder
    const toggleReminder = async id => {
        const taskToggle = await fetchTask(id)      
        const updTask = {...taskToggle, reminder: !taskToggle.reminder }   

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = res.json()

        setTasks(
            tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task)
        )
    }

    return (
        <div className="container">
          <Header visibleAdd={visibleAddTask} onAdd={() => setVisibleAddTask(!visibleAddTask)} />
          {
            visibleAddTask && <AddTask onAdd={addTask} /> 
          } 
          {
          tasks.length > 0 ?
            <Tasks
             tasks={tasks}
             onDelete={deleteTask}
             onToggle={toggleReminder}/>
          : 'No tasks to show!'
          }
        </div>
    )
}

export default App;
