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
                    <div class="box">
                <form>
                    <span class="textHeading">login</span>
                <div class="input-container">
                    <input type="text" required=""
                    name="inputUsername"
                    id="inputUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                    <label
                
                    >Username</label>		
                </div>
                <div class="input-container">		
                    <input type="password" required=""
                    name="inputPassword"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <label
                
                    >Password</label>
                </div>
                    <button type="button" class="btn"
                    onClick={login}>LOGIN</button>
            </form>	
            </div>
            {/* <Particles
        params={{
            particles: {
                number: {
                    value: 400,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: '#fff'
                },
                opacity: {
                    value: 0.5,
                    anim: {
                        enable: true
                    }
                },
                size: {
                    value: 7,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    speed: 0.2
                }
             }    
        }}    
      /> */}
        </div>
    );
}