import Link from 'next/link'
import { useAuth } from '../context/auth'
import {useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function Nav() {
  const { logout, profileName, avatarImage,pagetype,setpagetype,token } = useAuth();
  const [showlogin, setShowlogin] = useState(false);
  const [showregister, setShowregister] = useState(false);
  const [showavtar, setShowavtar] = useState(true);
  
  function pagechange(){
    if(pagetype=="HOME"){
      setShowlogin(false);
      setShowregister(false);
      setShowavtar(true);
    }
    if(pagetype=="LOGIN"){
      setShowlogin(false);
      setShowregister(true);
      setShowavtar(false);
    }
    if(pagetype=="REGISTER"){
      setShowlogin(true);
      setShowregister(false);
      setShowavtar(false);
    }
  }
  useEffect(() => {pagechange()},[pagetype]);
  return (
    <nav className='bg-blue-600'>
      <ul className='flex items-center justify-between p-5'>
        <ul className='flex items-center justify-between space-x-4'>
          <li>
            <Link href="/" passHref={true}>
              <a>
                <h1 className='text-white font-bold text-xl'>Todo</h1>
              </a>
            </Link>
          </li>
        </ul>
        <ul className='flex'>
          <li className='text-white mr-2' style ={{display: (showlogin?"":"none")}}>
            <Link href='/login'>Login</Link>
          </li>
          <li className='text-white' style ={{display: (showregister?"":"none")}}>
            <Link href='/register'>Register</Link>
          </li>
        </ul>
        <div className='inline-block relative w-28' style ={{display: (showavtar?"":"none")}}>
          <div className='group inline-block relative'>
            <button className='bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
              <img src={avatarImage} />
              <span className='mr-1'>{profileName}</span>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </button>
            <ul className='absolute hidden text-gray-700 pt-1 group-hover:block'>
              <li className=''>
                <a
                  className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                  href='#'
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </nav>
  )
}
