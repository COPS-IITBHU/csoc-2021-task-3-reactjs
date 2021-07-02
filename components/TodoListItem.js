/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { displayErrorToast, displayInfoToast, displaySuccessToast, displayWarnToast} from "../pages/_app";

export default function TodoListItem({id, title, refreshTasks}) {

  const { token } = useAuth();
  const [ updatedTodo, setupdatedTodo ] = useState("");
  const [ edit, setedit ] = useState(false);

  const updateHandler = (event) => {
    setupdatedTodo(event.target.value);
  }

  const editTask = (id) => {
    setedit(edit^1);                            //Toggles the update task input box
  };

  const deleteTask = (id) => {
     axios({
      headers: {
          Authorization: "Token " + token
      },
      url: "todo/" + id + "/",
      method: "delete"
      })
      .then(function ({ data, status }) {
          refreshTasks();
          displaySuccessToast("Task deleted Successfully!");
      })
      .catch(function (err) {
          displayErrorToast("We are unable to process the request. Please try again later!");
      });
  };

  const updateTask = (id) => {
    if(updatedTodo.trim() === "")                            //No Backend request is made for empty or same task 
    {
      displayWarnToast("Please enter the input field correctly");
      return ;
    }
    if(updatedTodo === title)
    {
      setedit(false);
      displaySuccessToast("Task Updated Successfully");
      return ;
    }
     axios({
      headers: {
          Authorization: "Token " + token
      },
      url: "todo/" + id + "/",
      method: "patch",
      data: { title: updatedTodo }
      })
      .then(function (response) {
          displaySuccessToast("Task Updated Successfully");
          setedit(false);
          setupdatedTodo("");
          refreshTasks();
      })
      .catch(function (err) {
          displayErrorToast("We are unable to process the request. Please try again later!");
      });
  };

  return (
    <>
      <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
        <input
          id={`input-button-${id}`}
          type="text"
          className={ `${!edit && "hideme"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder={title}
          value = { updatedTodo }
          onChange = { updateHandler }
        />
        <div id={`done-button-${id}`} className={`${!edit && "hideme"}`}>
          <button
            className= "bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${id}`} className={`${edit && "hideme"} todo-task  text-gray-600`}>
          {title}
        </div>
        <span id={`task-actions-${id}`} className="">
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
