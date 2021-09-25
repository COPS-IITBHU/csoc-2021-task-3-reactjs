import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import axios from "axios";
import { stringify } from "postcss";

export default function LoginForm() {
  const router = useRouter();
  const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useAuth();
  const login = () => {
    // e.preventDefault();
    if (username && password) {
      console.log("Entered something");

      const dataForApiRequest = {
        username: username,
        password: password,
      };

      axios({
        url: API_BASE_URL + "auth/login/",
        method: "post",
        data: dataForApiRequest,
      })
        .then(function ({ data, status }) {
          setToken(data.token);
          console.log(token);
          router.replace("/");
        })
        .catch(function (err) {
          console.log(
            "No such account exists. Make a new account by regsitering."
          );
        });
    } else {
      console.log("Enter Something");
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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
