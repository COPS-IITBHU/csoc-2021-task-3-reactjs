import axios from 'axios'
import Script from 'next/script'
import { useAuth } from '../context/auth'
import { useEffect} from 'react'
import '../node_modules/izitoast/dist/css/iziToast.min.css'
import checkLogin from '../middlewares/no_auth_required'

export default function RegisterForm() {
  const { setToken } = useAuth()
  const login = () => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    if (document.getElementById('inputUsername').value === '' || document.getElementById('inputPassword').value === '') {
      try { iziToast.destroy(); iziToast.error({ title: "Error", message: 'All Fields Are Mandatory' }) } catch {} return;
    }
    const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/'
    const dataForApiRequest = {
      username: document.getElementById('inputUsername').value,
      password: document.getElementById('inputPassword').value
    }
    try { iziToast.show({ title: "Wait", message: 'Checking Your Credentials' }) } catch { }
    axios({
      url: API_BASE_URL + 'auth/login/',
      method: 'post',
      data: dataForApiRequest,
    }).then(function ({ data, status }) {
      // localStorage.setItem('token', data.token);
      setToken(data.token)
      window.location.href = '/';
    }).catch(function (err) {
      { try { iziToast.destroy(); iziToast.error({ title: "Error", message: 'Invalid Credentials' }) } catch { } }
    })
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js'></Script>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
