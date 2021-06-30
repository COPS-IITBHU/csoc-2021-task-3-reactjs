/* eslint-disable @next/next/no-img-element */

import axios from "../utils/axios";
import { useRef } from "react";
import {useAuth} from '../context/auth';
import Toast from './Toast';
import {useToast} from '../context/toast';

export default function TodoListItem(props) {
  const updateFieldRef =  useRef(null);
  const updateButtonRef = useRef(null);
  const titleRef = useRef(null);
  const editAndDeleteRef = useRef(null);
  const containerRef = useRef(null);
  const {token} = useAuth();
  const [state, show, text, spinner, setState, setShow, setText, setSpinner, hideToast] = useToast();

  const hideClasses = () => {
    updateFieldRef.current.classList.remove('hideme');
    updateButtonRef.current.classList.remove('hideme');
    titleRef.current.classList.add('hideme');
    editAndDeleteRef.current.classList.add('hideme');
  }

  const showClasses = () => {
    updateFieldRef.current.classList.add('hideme');
    updateButtonRef.current.classList.add('hideme');
    titleRef.current.classList.remove('hideme');
    editAndDeleteRef.current.classList.remove('hideme');
  }

  const editTask = (id) => {
    hideClasses();
  }

  const deleteTask = (id) => {
    setShow(true);
    setSpinner(true);
    setState('neutral');
    setText("Deleteing Task")

    axios({
      url : `todo/${id}/`,
      method : 'delete',
      headers : {
        'Authorization' : `Token ${token}`
      }
    })
    .then(response => {

      const event = new CustomEvent('deletedTask', {
        bubbles : true,
        detail : {
          id
        }
      });
      containerRef.current.dispatchEvent(event);

    })
    .catch(error => {
      setState('danger');
      setSpinner(false);
      setText("Something Went Wrong");
      hideToast();
    })
  }

  const updateTask = (id) => {
    const title = updateFieldRef.current.value;

    if (title !== "") {
      setShow(true);
      setSpinner(true);
      setState('neutral');
      setText("Updating Task")

      const data = {title};

      axios({
        url : `todo/${id}/`,
        data,
        method : 'put',
        headers : {
          'Authorization' : `Token ${token}`
        }
      })
      .then(({data, status}) => {
        titleRef.current.textContent = data.title;
        showClasses();

        setSpinner(false);
        setState('success');
        setText("Task Updated Successfully");
        hideToast();

      })
      .catch(error => {

        showClasses();
        setSpinner(false);
        setState('danger');
        setText("Something Went Wrong");
        hideToast();

      })
    } else {
      showClasses();
    }
  }

  return (
    <>
      <li
        className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2"
        id={`task-container-${props.id}`}
        ref = {containerRef}
      >
        <input
          id={`input-button-${props.id}`}
          type="text"
          className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
          ref={updateFieldRef}
        />
        <div
          id={`done-button-${props.id}`}
          className="hideme"
          ref={updateButtonRef}
        >
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div
          id={`task-${props.id}`}
          className="todo-task  text-gray-600"
          ref={titleRef}
        >
          {props.title}
        </div>
        <span
          id={`task-actions-${props.id}`}
          className=""
          ref={editAndDeleteRef}
        >
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => editTask(props.id)}
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
            onClick={() => deleteTask(props.id)}
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
      <Toast
        neutral={state === "neutral"}
        success={state === "success"}
        danger={state === "danger"}
        show={show}
        text={text}
        spinner={spinner}
      />
    </>
  );
}
