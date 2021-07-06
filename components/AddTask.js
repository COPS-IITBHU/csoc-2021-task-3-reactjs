import { useRef } from "react";
import axios from '../utils/axios';
import {useAuth} from '../context/auth';
import Toast from './Toast';
import {useToast} from '../context/toast';

export default function AddTask() {
  const taskRef = useRef(null);
  const {token} = useAuth();
  const [state, show, text, spinner, setState, setShow, setText, setSpinner, hideToast] = useToast();

  const addTask = () => {
     const title = taskRef.current.value;

     if (title != "") {
      setShow(true);
      setState('neutral');
      setText("Adding Task");
      setSpinner(true);

       const data = {
         title,
       };

       axios({
         url: "todo/create/",
         method: "post",
         headers: {
           Authorization: `Token ${token}`,
         },
         data,
       })
         .then(({ data, status }) => {
           const event = new CustomEvent("addedTask", {
             bubbles: true,
           });
           taskRef.current.dispatchEvent(event);

           taskRef.current.value = '';
           taskRef.current.focus();
           setState('success');
           setText("Task Added Successfully");
           setSpinner(false);
           hideToast();

         })
         .catch((err) => {

           setState('danger');
           setText("Something Went Wrong.");
           setSpinner(false);
           hideToast();

         });
     } else {
       setShow(true);
      setState('danger');
      setText("Task Cannot be Empty.");
      setSpinner(false);
      hideToast();
     }
  }

  return (
    <>
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        ref = {taskRef}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
    <Toast 
      show={show}
      neutral={state === 'neutral'}
      danger={state === 'danger'}
      success={state === 'success'}
      spinner={spinner}
      text={text}
    />
    </>
  )
}
