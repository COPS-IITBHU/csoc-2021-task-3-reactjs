// importing... 

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";






// exporting along with definition and declatation of the function RegisterForm 

export default function RegisterForm() {
    const app = useAppContext();
    
    // link for the backend 
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";

    // useState is imported for the application here 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();







    // function to check the validation of the entered fields 

    const registerFieldsAreValid = (firstName, lastName, email, username, password) => {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            username === "" ||
            password === ""
        ) {
            iziToast.error({  // izitoast for the better user interface 
                title: "Error",
                message: "Please correctly enter the fields !"
            });
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            iziToast.error({
                title: "Error",
                message: "Please enter correct email !"
            });
            return false;
        }
        return true;
    };






    // function regiter here 
    const register = (e) => {
        e.preventDefault();

        if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
            iziToast.destroy();
            iziToast.info({
                title: "Wait",
                message: "Processing..."
            });

            const dataForApiRequest = {
                name: firstName + " " + lastName,
                email: email,
                username: username,
                password: password
            };

            // axios section 

            axios({
                url: API_BASE_URL + "auth/register/",
                method: "post",
                data: dataForApiRequest
            })
                .then(function ({ data, status }) {
                    app.login(data.token);
                    router.replace("/");
                })
                .catch(function (err) {
                    iziToast.destroy();
                    iziToast.error({
                        title: "Error",
                        message: "Account already exist with either same Username or Email, Please try with another one"
                    });
                });
        }
    };





    // returning whatever we want to meet our requirements 

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Registration Form</h1>




                    {/* input field start here  */}
                    {/* the inputs are set with the useState in React  */}
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputFirstName"
                        id="inputFirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter Firstname"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputLastName"
                        id="inputLastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Lastname"
                    />

                    <input
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputEmail"
                        id="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email ID"
                    />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputUsername"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputPassword"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />

                    {/* input fields ended  */}




                    {/* button to submit the entered details of the user */}
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
                        onClick={register}>
                        Click here to Register
                    </button>
                </div>
            </div>
        </div>
    );
}
