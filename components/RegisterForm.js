import React, { useState, useEffect } from "react";
import axios from "axios";
import no_auth_required from "../middlewares/no_auth_required";
import iziToastMin from "../public/iziToast.min";

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
            iziToastMin.error({
                title: "Error",
                message: "Please fill all the fields correctly."
            });
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            iziToastMin.error({
                title: "Error",
                message: "Please enter a valid email address."
            });
            return false;
        }
        return true;
    };

    const register = (e) => {
        e.preventDefault();

        if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
            iziToastMin.destroy();
            iziToastMin.info({
                title: "Info",
                message: "Please wait..."
            });

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
                    iziToastMin.destroy();
                    iziToastMin.error({
                        title: "Error",
                        message: "An account using same email or username is already created"
                    });
                });
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Register</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputFirstName"
                        id="inputFirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputLastName"
                        id="inputLastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />

                    <input
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputEmail"
                        id="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                    />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputUsername"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="inputPassword"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
                        onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
