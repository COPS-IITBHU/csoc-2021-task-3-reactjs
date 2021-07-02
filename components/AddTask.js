import axios from "../utils/axios";
import { useState } from "react";
import { useAuth } from "../context/auth";
import iziToastMin from "../public/iziToast.min";

export default function AddTask({ refreshTasks }) {
  const [newTodo, setnewTodo] = useState("");
  const { token } = useAuth();

  const todoChangeHandler = (event) => {
    setnewTodo(event.target.value);
  };

  const addTask = () => {
    if (newTodo.trim() === "") {
      return;
    }
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: "todo/create/",
      method: "post",
      data: { title: newTodo.trim() },
    })
    .then(function (response) {
      axios({
        headers: {
          Authorization: "Token " + token,
        },
        url: "todo/",
        method: "get",
      })
      .then(function ({ data, status }) {
        refreshTasks();
        // displaySuccessToast("Task Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        // displayErrorToast(
        //   "We are unable to process the request. TryAgain Later"
        // );
      });
      setnewTodo("");
    })
    .catch(function (err) {
      displayErrorToast("An error occurred!");
    });
  };

  return (
    <div className="flex items-center max-w-sm mt-24">
      <input
        type="text"
        className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        placeholder="Enter Task"
        value={newTodo}
        onChange={todoChangeHandler}
      />
      <button
        type="button"
        className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}
