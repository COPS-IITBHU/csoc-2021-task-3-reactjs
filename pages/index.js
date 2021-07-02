// importing... 
import axios from "axios";
import JoinTodo from "../components/JoinTodo";
import TodoListItem from "../components/TodoListItem";
import { useState, useEffect } from "react";
import { useAuthRequired } from "../middlewares/auth_required";
import { useAppContext } from "../components/AppContext";
import Nav from "../components/Nav";
import Script from "next/script";






// exporting the Home function along with it's declartion and definition 

export default function Home() {
    useAuthRequired();
    const app = useAppContext();
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [profileName, setName] = useState("");
    const [avatarImage, setPhoto] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [len, setLen] = useState(0);




    // function getTasks starts here ..... 

    function getTasks() {         // promising part 
        try {
            
        } catch (e) {
            console.error(e);
        }






        // axios section... 
        axios({
            headers: {
                Authorization: "Token " + app.token
            },
            url: API_BASE_URL + "todo/",
            method: "get"
        })
            .then(function (response) {
                const { data, status } = response;
                setTaskList(data);
                alert('loaded all todos')
            })
            .catch(function (err) {
                alert('something went wrong')
            });
    }



    // function addNewTask 

    const addNewTask = (task) => {
        const temp = [...taskList, task];
        setTaskList(temp);
    };


    // function deleteTask 

    const deleteTask = (id) => {
        // no idea 
    };






    useEffect(async () => {
        if (!app.token) {
            try {
                alert('please sign in first')
            } catch (e) {}
            return;
        }
        await axios  // asynchronous
            .get(API_BASE_URL + "auth/profile/", {
                headers: {
                    Authorization: "Token " + app.token
                }
            })
            .then((response) => {
                setPhoto(
                    "https://ui-avatars.com/api/?name=" +
                        response.data.name +
                        "&background=fff&size=33&color=007bff"
                );
                setName(response.data.name);
                getTasks();
            })
            .catch((error) => {
                console.log(error);
                if (typeof document != "object") {
                    console.log("An error occurred");
                } else {
                    alert('something went wrong')
                }
            });
    }, []);





    // this line of code change the title of the page 
    useEffect(()=>{
        document.title=`Todo's-Pending(${(taskList.length)})`
    })
    


    let leng=0




    
    // returning whatever we want to meet our requirements 

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav profileName={profileName} avatarImage={avatarImage} page="index" />
            <center>
                <JoinTodo addNewTask={addNewTask} />
                <ul className="flex-col mt-9 max-w-sm mb-3 ">
                    {/* {leng=(taskList.length)} */}
                    {/* {console.log(leng)} */}
                    <span className="available inline-block bg-green-600 py-1 mb-2 px-355 text-white font-bold rounded-full ">
                        Available Todo's : <span className='todo-count'>{(taskList.length)}</span>
                    </span>
                    {taskList.map((task) => (

                        
                        <TodoListItem
                        task={task.title}
                        id={task.id}
                        key={task.id}
                        deleteTask={deleteTask}
                        />
                        ))}
                        {/* {setLength({taskList}.length)}
                        {console.log(length)} */}
                </ul>
            </center>

            {/* button to remove all the todos at once  */}

            {/* <button className='btn remove-all' onClick={removeAllTodo}> Remove All Todos</button> */}
            <button className='btn remove-all' > Remove All Todos</button>
        </div>
    );
}
