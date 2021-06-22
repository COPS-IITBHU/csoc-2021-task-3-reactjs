import { useState } from "react";
import axios from "axios";

export default function AddTask(props) {
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [value, setValue] = useState("");
    const addTask = () => {
        const todoText = value.trim();

        if (!todoText) {
            return;
        }

        axios({
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            },
            url: API_BASE_URL + "todo/create/",
            method: "post",
            data: { title: todoText }
        })
            .then(function (response) {
                axios({
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token")
                    },
                    url: API_BASE_URL + "todo/",
                    method: "get"
                }).then(function ({ data, status }) {
                    const newTask = data[data.length - 1];
                    props.addNewTask(newTask);
                });
            })
            .catch(function (err) {
                console.log("An error occurred");
            });
    };
    return (
        <div className="flex items-center max-w-sm mt-24">
            <input
                type="text"
                className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
                placeholder="Enter Task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                type="button"
                className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
                onClick={addTask}>
                Add Task
            </button>
        </div>
    );
}
