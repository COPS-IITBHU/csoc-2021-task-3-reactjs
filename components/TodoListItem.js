import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";


export default function TodoListItem(props) {
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [task, setTask] = useState(props.task);
    const [editMode, setEditMode] = useState(false);
    const editTask = (id) => {
        setEditMode(true);
    };

    const deleteTask = (id) => {
        axios({
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            },
            url: API_BASE_URL + "todo/" + id + "/",
            method: "delete"
        })
            .then(function ({ data, status }) {
                props.deleteTask(id);
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    const updateTask = (id) => {
        const todoText = task.trim();
        if (!todoText) {
            alert("Enter something please")
            return;
        }
        axios({
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            },
            url: API_BASE_URL + "todo/" + id + "/",
            method: "patch",
            data: { title: todoText }
        })
            .then(function ({ data, status }) {
                setEditMode(false);
                
            })
            .catch(function (err) {
                alert("Error emcountered")
            });
    };

    return (
        <>
            <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2 taskInput">
                <input
                    id={`input-button-${props.id}`}
                    type="text"
                    className={`${
                        editMode ? "" : "hideme"
                    } appearance-none border rounded w-full py-2 px-3 taskInput text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
                    placeholder="Edit The Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div id={`done-button-${props.id}`} className={`${editMode ? "" : "hideme"}`}>
                    <button
                        className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
                        type="button"
                        onClick={() => updateTask(props.id)}>
                        Done
                    </button>
                </div>
                <div
                    id={`task-${props.id}`}
                    className={`todo-task  text-gray-600 ${editMode ? "hideme" : ""}`}>
                    {task}
                </div>
                <span id={`task-actions--${props.id}`} className={`${editMode ? "hideme" : ""}`}>
                    <button
                        style={{ marginRight: "5px" }}
                        type="button"
                        onClick={() => editTask(props.id)}
                        className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2">
                       <Image
                       className="img"
                            src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                            width={18}
                            height={20}
                            alt="Edit"
                        />
                    </button>
                    <button
                        type="button"
                        className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
                        onClick={() => deleteTask(props.id)}>
                         <Image
                         className="img"
                            src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                            width={18}
                            height={22}
                            alt="Delete"
                        />
                    </button>
                </span>
            </li>
        </>
    );
}