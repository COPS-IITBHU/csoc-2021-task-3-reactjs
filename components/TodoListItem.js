// importing... 

import React, { useState } from "react";
// either we can use useState by React.useState 
import Image from "next/image";
import Footer from "../components/Footer";
import axios from "axios";
import { useAppContext } from "./AppContext";
import { useEffect } from "react";








    
    // delete function 

    const deleteTask = (id) => {
        axios({
            headers: {
                Authorization: "Token " + app.token
            },
            url: API_BASE_URL + "todo/" + id + "/",
            method: "delete"
        })
            .then(function ({ data, status }) {
                props.deleteTask(id);
                alert('todo deleted successfully')
            })
            .catch(function (error) {
                alert("something happened wrong")
                
            });
    };














// exporting the function TodoListItem along with its declaration and definition 

export default function TodoListItem(props) {
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const app = useAppContext();
    const [editMode, setEditMode] = useState(false);
    const [task, setTask] = useState(props.task);
    const editTask = (id) => {
        setEditMode(true);
    };












    // update function 

    const updateTask = (id) => {
        const todoText = task.trim();
        if (!todoText) {
            alert('start adding')
            return;
        }






        // axios section 

        axios({
            headers: {
                Authorization: "Token " + app.token
            },
            url: API_BASE_URL + "todo/" + id + "/",
            method: "patch",
            data: { title: todoText }
        })        // promises part


            .then(function ({ data, status }) {
                setEditMode(false);
                alert('todo updated successfully')
            })
            .catch(function (err) {
                alert('something happened wrong')
            });
    };

    // const[count,setCount]=useState(0)
    // var counter = [];
    // useEffect((props)=>{
        
    //     for( let ele in props){
    //     counter.push(ele)
    //     }
    //     console.log(counter)

        // var obj = Object.assign(counter,props)
        // var myobj = JSON.stringify(obj)
        // var myobjlength = myobj.length
        // console.log((myobjlength.length))

        // console.log(props.id)


        
        // let str = JSON.stringify(props)
        // let counter =0
        // for (let ob in props){
        //     counter++;
        //     // console.log(ob.length)
        // }
        // console.log(counter)
    // })




    
    // returning whatever we require according to the requirements 

    return (
        <React.Fragment>
            <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
                <input
                    id={`input-button-${props.id}`}
                    type="text"
                    className={`${
                        editMode ? "" : "hideme"
                    }
                    
                    appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
                    placeholder="Edit The Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}/>




                <div id={`done-button-${props.id}`} className={`${editMode ? "" : "hideme"}`}>
                    <button
                        className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm 
                         hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
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
                        className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 pt-1.5">
                        <Image
                            src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                            width={20}
                            height={25}
                            alt="Edit"/>
                    </button>



                    {/* for deleting the Todo by passing the Id as reference to know to delete the particular Todo having the same Id as passed */}
                    <button
                        type="button"
                        className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 pt-1"
                        onClick={() => deleteTask(props.id)}>
                        <Image
                            src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                            width={20}
                            height={25}
                            alt="Delete"
                        />
                    </button>
                    {/* <Footer/> */}
{/* footer can't be placed here because already placed in other file */}


                </span>
            </li>
        </React.Fragment>
    );
}
