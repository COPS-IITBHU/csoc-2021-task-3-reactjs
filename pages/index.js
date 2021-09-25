import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import authRequired from "../middlewares/auth_required";
export default function Home() {
  const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
  const { token } = useAuth();
  authRequired();

  function getTasks() {
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_BASE_URL + "todo/",
      method: "get",
    }).then(function (response) {
      const { data, status } = response;
      setTasks(data);
    });
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <center>
        <AddTask tasks={tasks} setTasks={setTasks} />
        <ul className="flex-col mt-9 max-w-sm mb-3 ">
          <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
            Available Tasks
          </span>
          {/* {console.log(tasks)} */}
          {tasks.length === 0 ? (
            <h4>No tasks to display!</h4>
          ) : (
            tasks.map((task) => {
              return (
                <TodoListItem
                  todo={task.title}
                  id={task.id}
                  tasks={tasks}
                  setTasks={setTasks}
                  key={task.id}
                />
              );
            })
          )}
        </ul>
      </center>
    </div>
  );
}
