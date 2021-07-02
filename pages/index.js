import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";

export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: "todo/",
      method: "get",
    })
    .then(function ({ data }) {
        // iziToast.destroy();
        console.log(data);
        setTasks(data);
        // data.forEach((element) => createNewElement(element));
    })
    .catch(function (err) {
        console.log(err);
        // iziToast.error({
        //   title: "Error",
        //   message: "Oops Something went wrong!",
        // });
    });
  }
  
  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div>
      <center>
        <AddTask />
        <ul className="flex-col mt-9 max-w-sm mb-3 ">
          <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
            Available Tasks
          </span>
          <TodoListItem tasks={tasks} />
        </ul>
      </center>
    </div>
  );
}
