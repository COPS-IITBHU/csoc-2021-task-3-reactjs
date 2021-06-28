import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const [pagetype,setpagetype] = useState("HOME"); 
  const token = cookies.token;
  const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';
  const config={
    headers: {
        Authorization: "Token " + cookies.token
    },
  };
  
  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  
  const loginpage=()=>{
    const text= window.location.href;
    if(text.indexOf("/login")===-1) router.push('/login')
  }
  const homepage=()=>{
    const text= window.location.href;
    if(text.indexOf("/login")>-1 || text.indexOf("/register")>-1) router.push('/')
  }
  const logout = () => {
    deleteToken();
    const text= window.location.href;
    if(text.indexOf("/login")===-1) router.push('/login');
  }
  const login = (newtoken) => {
    setToken(newtoken);
    const text= window.location.href;
    if(text.indexOf("/login")>-1 || text.indexOf("/register")>-1) window.location.href='/';
  }

  useEffect(() => {
    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name)
        })
        .catch((error) => {
          console.log('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
        login,
        loginpage,
        homepage,
        pagetype,
        setpagetype,
        API_BASE_URL,
        config,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
