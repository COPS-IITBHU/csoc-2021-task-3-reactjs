// importing the necessary components

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";






// section for Login 
export default function LoginForm() {
    const app = useAppContext();
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();


    // login funtion 
    const login = (e) => {
        e.preventDefault();

        if (username == "" || password == "") {
            iziToast.destroy();
            iziToast.error({
                title: "Error",
                message: "Please fill all the fields correctly."
            });
        } else {
            iziToast.destroy();
            iziToast.info({
                title: "Info",
                message: "Processing..."
            });
            const dataForApiRequest = {
                username: username,
                password: password
            };



            // axios definition 

            axios({
                url: API_BASE_URL + "auth/login/",
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
                        message: "Either username or password is incorrect"
                    });
                });
        }
    };




    // gettting the output what we required 

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mt-0 mb-8 text-3xl text-center">
                        <h1 className="mb-0 text-7xl text-center">👤</h1>
                        <br />
                        Member Login</h1>


                {/* above divs for the decoration of the login form  */}
                    {/* input field to get the username and password from the user  */}
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputUsername"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your Username"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputPassword"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your Password"
                    />



                    {/* button to submit the fields entered by the user  */}

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
                        onClick={login}>
                        Click Here to Login
                    </button>
                    
                    {/* forgot username and password button  */}
                    <a href= 'https://naveen-kumar-portfolio.herokuapp.com' ><button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-transparent text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 hover:border-transparent focus:outline-none my-1"
                         >
                        Forgot Something Contact Us !
                    </button></a>
                </div>
            </div>
        </div>
    );
}
