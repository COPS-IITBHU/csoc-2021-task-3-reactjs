import Nav from "../components/Nav";
import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useState, useEffect } from "react";
import axios from "axios";
import auth_required from "../middlewares/auth_required";
import Particles from 'react-particles-js';

export default function Home() {
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [profileName, setProfileName] = useState("");
    const [avatarImage, setAvatarImage] = useState("");
    const [taskList, setTaskList] = useState([]);

    function getTasks() {
        axios({
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            },
            url: API_BASE_URL + "todo/",
            method: "get"
        })
            .then(function (response) {
                const { data, status } = response;
                setTaskList(data);
            })
            .catch(function (err) {
            });
    }

    const addNewTask = (task) => {
        const temp = [...taskList, task];
        setTaskList(temp);
    };

    const deleteTask = (id) => {
        let temp = [...taskList];
        temp = temp.filter((task) => {
            return task.id != id;
        });
        setTaskList(temp);
    };

    useEffect(() => {
        auth_required();
        axios
            .get(API_BASE_URL + "auth/profile/", {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                setAvatarImage(
                    "https://ui-avatars.com/api/?name=" +
                        response.data.name +
                        "&background=faebd7&size=33&color=007bff"
                );
                setProfileName(response.data.name);
                getTasks();
            })
            .catch((error) => {
               console.log(error)
            });
    }, []);

    return (
        <div>
            <Nav profileName={profileName} avatarImage={avatarImage} page="index" />
            <center>
               
                <div >
                <div className="boxTasks">
                <AddTask addNewTask={addNewTask} />
                <ul className="flex-col mt-9 max-w-sm mb-3 ">
                    <br/>
                    <span className="textHeading" >
                        Available Tasks
                   
                    </span>
                    <br/>
                    <div className="tasks ">
                    {taskList.map((task) => (
                        <TodoListItem
                        className="taskInput"
                            task={task.title}
                            id={task.id}
                            key={task.id}
                            deleteTask={deleteTask}
                        />
                    ))}
                    </div>
                </ul>
                </div>
                </div>
            </center>
            <Particles
      params={{
        "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
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
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
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
      />
        </div>
    );
}