
import React, { useState, useEffect } from "react";
import axios from "axios";
import no_auth_required from "../middlewares/no_auth_required";


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
                    <div className="box">
                <form>
                    <span className="textHeading">Register</span>
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
                    <input type="text" required=""
                    name="inputFirstName"
                    id="inputFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                    <label
                
                    >Firstname</label>		
                </div>
                <div className="input-container">
                    <input type="text" required=""
                   name="inputLastName"
                   id="inputLastName"
                   value={lastName}
                   onChange={(e) => setLastName(e.target.value)}/>
                    <label
                
                    >Lastname</label>		
                </div>
                <div className="input-container">
                    <input type="text" required=""
                    name="inputEmail"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <label
                
                    >Email</label>		
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
                    onClick={register}>REGISTER</button>
            </form>	
            </div>
            
        </>
        </>
    );
}