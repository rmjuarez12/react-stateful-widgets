// Import React
import React, { useState } from "react";

// Import Dependencies
import { nanoid } from "nanoid";

// Component for the To do list
function ToDoList(props) {
  return (
    <li id={props.id} className="todo stack-small animate__animated animate__backInLeft">
      <div className="c-cb">
        <input
          type="checkbox"
          defaultChecked={props.completed}
          onClick={(e) => {
            if (props.completed === true) {
              props.completeTask(props.id, false);
              e.target.parentNode.classList.remove("completed");
              console.log("uncheck");
            } else {
              props.completeTask(props.id, true);
              e.target.parentNode.classList.add("completed");
              console.log("check");
            }
          }}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn__danger"
          onClick={(e) => {
            e.preventDefault();
            props.deleteTask(props.id);
          }}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}

// Component for the Add a new task form
function Form(props) {
  const [taskName, setTaskName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (taskName === "") {
          alert("Enter a name");
        } else {
          props.addTask(taskName);
          setTaskName("");
        }
      }}
    >
      <h3 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h3>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={taskName}
        onChange={(text) => {
          setTaskName(text.target.value);
        }}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

// Full ToDo list component
export default function Todos(props) {
  const [toDoTasks, setToDoTasks] = useState([]);
  const getCompletedTasks = toDoTasks.filter((task) => task.completed === true);

  // Function that adds a new task
  function addNewTask(name) {
    // Object of the new task
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };

    // Set the new state
    setToDoTasks([...toDoTasks, newTask]);
  }

  // Function to delete a task
  function deleteThisTask(id) {
    // Get the index of the task to delete
    const getIndexOfTask = toDoTasks.map((task) => task.id).indexOf(id);

    // Create a new array and delete the task
    const newArr = [...toDoTasks];
    newArr.splice(getIndexOfTask, 1);

    // Add some animation
    const getTaskElement = document.getElementById(id);
    getTaskElement.classList.add("animate__backOutLeft");

    // Set the new state
    setTimeout(() => {
      setToDoTasks(newArr);
    }, 500);
  }

  // Function to check/uncheck a task
  function completeThisTask(id, completed) {
    // Get the task from the task list
    let getTask = toDoTasks.filter((task) => task.id === id);
    getTask[0].completed = completed;

    // Get the index of the task to delete
    const getIndexOfTask = toDoTasks.map((task) => task.id).indexOf(id);

    // Create a new array and delete the task
    const newArr = [...toDoTasks];
    newArr.splice(getIndexOfTask, 1, getTask[0]);

    // Set the new state
    setToDoTasks(newArr);
  }

  return (
    <div className="todoapp stack-large container">
      <h2>To-do List</h2>
      <Form addTask={addNewTask} />
      <h3 id="list-heading">
        {getCompletedTasks.length} / {toDoTasks.length} tasks completed
      </h3>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {toDoTasks.map((item) => {
          return (
            <ToDoList
              name={item.name}
              completed={item.completed}
              id={item.id}
              key={item.id}
              deleteTask={deleteThisTask}
              completeTask={completeThisTask}
            />
          );
        })}
      </ul>
    </div>
  );
}
