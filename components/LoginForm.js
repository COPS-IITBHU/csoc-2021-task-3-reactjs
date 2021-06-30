// importing the necessary components


// version 1.0.6

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Link from 'next/link'





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
            
            alert("please check your data once again and fill that correctly")
        } else {
            alert("please wait... | processing")



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
                    alert("either username or password is incorrect")
                });
        }
    };




    // gettting the output what we required 

    return (
        <div className="main1">
            <div className="main2">
                <div className="main3">
                    <h1 className="main4">
                        <h1 className="main5"><span id='avatar'>👤</span></h1>
                        <br />
                        Member Login</h1>


                {/* above divs for the decoration of the login form  */}
                    {/* input field to get the username and password from the user  */}
                    <input
                        type="text"
                        className="enter-task input-field"
                        name="inputUsername"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your Username"
                    />

                    <input
                        type="password"
                        className="enter-task margin-bottom-password input-field"
                        name="inputPassword"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your Password"
                    />



                    {/* button to submit the fields entered by the user  */}

                    <button
                        type="submit"
                        className="btn blck login"
                        onClick={login}>
                        Click Here to Login
                    </button>

                    
                    <button className='btn blck register-btn'><u><Link href='/register' >New? Sign Up First</Link></u></button>


                    {/* forgot username and password button  */}
                    <a href= 'https://naveen-kumar-portfolio.herokuapp.com' ><button
                        type="submit"
                        className="btn blck forgot"
                         >
                        Forgot Something Contact Us !
                    </button></a>

                </div>
            </div>
        </div>
    );
}
