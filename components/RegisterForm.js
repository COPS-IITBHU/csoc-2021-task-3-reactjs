
import React, { useState, useEffect } from "react";
import axios from "axios";
import no_auth_required from "../middlewares/no_auth_required";
import Particles from 'react-particles-js';

export default function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";

    useEffect(() => {
        no_auth_required();
    });

    const registerFieldsAreValid = (firstName, lastName, email, username, password) => {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            username === "" ||
            password === ""
        ) {
           alert("enter all the fields")
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert("Invalid email id")
            return false;
        }
        return true;
    };

    const register = (e) => {
        e.preventDefault();

        if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
            alert("please wait")

            const dataForApiRequest = {
                name: firstName + " " + lastName,
                email: email,
                username: username,
                password: password
            };

            axios({
                url: API_BASE_URL + "auth/register/",
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
        <>
     
        <>
                    <div class="box">
                <form>
                    <span class="textHeading">Register</span>
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
                    <input type="text" required=""
                    name="inputFirstName"
                    id="inputFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                    <label
                
                    >Firstname</label>		
                </div>
                <div class="input-container">
                    <input type="text" required=""
                   name="inputLastName"
                   id="inputLastName"
                   value={lastName}
                   onChange={(e) => setLastName(e.target.value)}/>
                    <label
                
                    >Lastname</label>		
                </div>
                <div class="input-container">
                    <input type="text" required=""
                    name="inputEmail"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <label
                
                    >Email</label>		
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
                    onClick={register}>REGISTER</button>
            </form>	
            </div>
            {/* <Particles
      params={{
        "particles": {
            "number": {
              "value": 6,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#1b1e34"
            },
            "shape": {
              "type": "polygon",
              "stroke": {
                "width": 0,
                "color": "#000"
              },
              "polygon": {
                "nb_sides": 6
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 160,
              "random": false,
              "anim": {
                "enable": true,
                "speed": 10,
                "size_min": 40,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false,
              "distance": 200,
              "color": "#ffffff",
              "opacity": 1,
              "width": 2
            },
            "move": {
              "enable": true,
              "speed": 8,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "grab"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
    }}    
      /> */}
        </>
        </>
    );
}