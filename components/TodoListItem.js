/* eslint-disable @next/next/no-img-element */
import { useAuth } from "../context/auth";
import axios from "axios";
import { useState } from "react";
export default function TodoListItem(e) {
  const id = e.id;
  const todo = e.todo;
  const [task, setTask] = useState(todo);
  const tasks = e.tasks;
  const setTasks = e.setTasks;
  const { token } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
  // console.log(id)
  const editTask = (id) => {
    setIsEdit(true);
  };

  const deleteTask = (key) => {
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_BASE_URL + "todo/" + key + "/",
      method: "delete",
    })
      .then(function ({ data, status }) {
        const newTasks = tasks.filter((task) => task.id != key);
        setTasks(newTasks);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const updateTask = (key) => {
    // console.log(key)
    setIsEdit(!isEdit);
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_BASE_URL + "todo/" + key + "/",
      method: "patch",
      data: { title: task },
    })
      .then(function ({ data, status }) {
        const newTasks = tasks;
        newTasks.map((task) => {
          if (task.id === key) {
            task.title = data.title;
          }
        });
        setTasks(newTasks);
        // console.log(tasks)
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
        <input
          id={"input-button-" + id}
          type="text"
          className={
            !isEdit
              ? "hideme"
              : "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          }
          placeholder={task}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div id={"done-button-" + id} className={!isEdit ? "hideme" : ""}>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(id)}
          >
            Done
          </button>
        </div>
        <div
          id={"task-" + id}
          className={isEdit ? "hideme" : "todo-task  text-gray-600"}
        >
          {task}
        </div>
        <span id="task-actions-1" className={isEdit ? "hideme" : ""}>
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => editTask(id)}
            className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
              width="18px"
              height="20px"
              alt="Edit"
            />
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
            onClick={() => deleteTask(id)}
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
              width="18px"
              height="22px"
              alt="Delete"
            />
          </button>
        </span>
      </li>
    </>
  );
}
