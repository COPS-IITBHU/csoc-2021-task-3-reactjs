import axios from 'axios'
export default function AddTask({todos,settodos}) {
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/'
    const str = (document.querySelector('.todo-add-task-input').value);
    if (str === '') return;
    { try { iziToast.show({ title: "Wait", message: 'Adding Todo' }) } catch { } }
    axios({
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
      method: 'post',
      url: API_BASE_URL + 'todo/create/',
      data: {
        title: str
      }
    }).then(function ({ data, status }) {
      { try { iziToast.success({ title: "Success", message: 'Added Todo' }) } catch { } }
      document.querySelector('.todo-add-task-input').value = ''
      axios({
        headers: { Authorization: 'Token ' + localStorage.getItem('token'), },
        url: API_BASE_URL + 'todo/',
        method: 'get',
      }).then((res) => settodos(res.data))
    }).catch((err) => { try { iziToast.error({ title: "Error", message: 'Cannot Add Todo' }) } catch { } })
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
