import React, { useState, useEffect } from "react";
import axios from "axios";
import no_auth_required from "../middlewares/no_auth_required";
import Particles from 'react-particles-js';

export default function LoginForm() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";

    useEffect(() => {
        no_auth_required();
    });

    const login = (e) => {
        e.preventDefault();

        if (username == "" || password == "") {
            alert("Fill all the details ")
        } else {
            const dataForApiRequest = {
                username: username,
                password: password
            };

            axios({
                url: API_BASE_URL + "auth/login/",
                method: "post",
                data: dataForApiRequest
            })
                .then(function ({ data, status }) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/";
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    };

    return (
        <div >
                    <div className="box">
                <form>
                    <span className="textHeading">login</span>
                <div className="input-container">
                    <input type="text" required=""
                    name="inputUsername"
                    id="inputUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                    <label
                
                    >Username</label>		
                </div>
                <div className="input-container">		
                    <input type="password" required=""
                    name="inputPassword"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <label
                
                    >Password</label>
                </div>
                    <button type="button" className="btn"
                    onClick={login}>LOGIN</button>
            </form>	
            </div>
            
        </div>
    );
}