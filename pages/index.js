import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { displayErrorToast, displayInfoToast, displaySuccessToast, displayWarnToast} from "../pages/_app"

export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  const refreshTasks = () => {
    getTasks();
  }

  function getTasks() {
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: "todo/",
      method: "get",
    })
    .then(function ({ data }) {
      setTasks(data);
      })
      .catch(function (err) {
        displayErrorToast("There was a problem connecting to the server");
      });
    }
    
    useEffect(() => {
    displayInfoToast("Please Wait! Loading the tasks");
    getTasks();
  }, []);


  return (
    <div>
      <center>
        <AddTask refreshTasks = { refreshTasks } /> 
        
        <ul className="flex-col mt-9 max-w-sm mb-3 ">
          <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
            Available Tasks
          </span>
          {
            tasks.map((task) => {
            return (
              <TodoListItem id={task.id} title={task.title} key={task.id} refreshTasks = {refreshTasks} />
            );
          })
          }
        </ul>
      </center>
    </div>
  );
}

