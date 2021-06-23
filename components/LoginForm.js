import React, { useState, useEffect } from "react";
import axios from "axios";
import no_auth_required from "../middlewares/no_auth_required";
// import iziToast from "../static/iziToast.min";

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
            iziToast.destroy();
            iziToast.error({
                title: "Error",
                message: "Please fill all the fields correctly."
            });
        } else {
            iziToast.destroy();
            iziToast.info({
                title: "Info",
                message: "Please wait..."
            });
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
                    iziToast.destroy();
                    iziToast.error({
                        title: "Error",
                        message: "Either username or password is incorrect"
                    });
                });
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
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
                        onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
