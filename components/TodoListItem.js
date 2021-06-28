/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import ListItem from "./display";


const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/'
export default function TodoListItem({todos, settodos}) {
  const editTask = (id) => {
    document.getElementById('task-' + id).classList.add('hideme');
    document.getElementById('task-actions-' + id).classList.add('hideme');
    document.getElementById('input-button-' + id).classList.remove('hideme');
    document.getElementById('done-button-' + id).classList.remove('hideme');
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
  }

  const deleteTask = (id) => {
    try { iziToast.show({ title: "Wait", message: 'Deleting Todo..' }) } catch { }
    axios({
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      },
      url: API_BASE_URL + 'todo/' + id + '/',
      method: 'delete',
    }).then(function () { settodos(todos.filter(todo => todo.id != id)); try { iziToast.success({ title: "Success", message: 'Todo Deleted' }) } catch { } }).catch((err) => { try { iziToast.error({ title: "Error", message: 'Cannot Delete Todo' }) } catch { } })
  }


    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */


  const updateTask = (id) => {
    document.getElementById('task-' + id).classList.remove('hideme');
    document.getElementById('task-actions-' + id).classList.remove('hideme');
    document.getElementById('input-button-' + id).classList.add('hideme');
    document.getElementById('done-button-' + id).classList.add('hideme');
    if (document.getElementById('input-button-' + id).value != '') {
      try { iziToast.show({ title: "Wait", message: 'Updating Todo..' }) } catch { }
      document.getElementById('task-' + id).innerHTML = document.getElementById('input-button-' + id).value;
      const data1 = { "id": id, title: document.getElementById('input-button-' + id).value }
      axios({
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        url: API_BASE_URL + 'todo/' + id + '/',
        method: 'patch',
        data: {
          title: document.getElementById('input-button-' + id).value
        }
      }).then(() => { settodos(todos.map((todo) => (todo.id === id) ? data1 : todo)); try { iziToast.destroy(); iziToast.success({ title: "Success", message: 'Todo Updated' }) } catch { } }).catch((err) => { try { iziToast.error({ title: "Error", message: 'Cannot Update Todo' }) } catch { } })
    }
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  }

  return (
    <>
     {
        todos.map((user) => (
          <ListItem updateTask={() => updateTask(user.id)} deleteTask={() => deleteTask(user.id)} editTask={() => editTask(user.id)} iid={user.id} title={user.title} key={user.id} />
        ))
      }
    </>
  )
}
