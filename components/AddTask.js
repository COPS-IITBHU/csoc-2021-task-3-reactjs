// importing... 

import { useState } from "react";
import axios from "axios";

import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";






// exporting and defining the funciton for adding the task 
export default function AddTask(props) {
    const app = useAppContext();

    // specifying the backend 
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [value, setValue] = useState("");
    // here initialising the empty string to state 'value'


    const addTask = () => {
        const todoText = value.trim();
        // for trimming the text 

        if (!todoText) { // when the todo text is empty 
            

            alert('Please Enter Atleast Some Text')

            return;
        }







        // axios section 

        axios({
            headers: {
                Authorization: "Token " + app.token
            },
            url: API_BASE_URL + "todo/create/",
            method: "post",
            data: { title: todoText }
        })
            .then(function (response) {
                axios({
                    headers: {
                        Authorization: "Token " + app.token
                    },
                    url: API_BASE_URL + "todo/",
                    method: "get"
                }).then(function ({ data, status }) {
                    const newTask = data[data.length - 1];
                    props.addNewTask(newTask);
                    
                    alert("new todo added successfully")
                });
            }) 
            // promises part 
            .catch(function (err) {
                
                alert("some error occured")
            });
    };






    // getting the output what we required 
    return (
        <div className="flex items-center max-w-sm mt-24">
            <input
                type="text"
                className="enter-task"
                placeholder="Enter Todo to Add"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />




            {/* adding the button to add the task to your Todo list  */}
            <button
                type="button"
                className="btn"
                onClick={addTask}>
                Add Task
            </button>
            {/* <Footer/> */}
        </div>
    );
}
