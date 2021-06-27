import { useEffect, useState, useContext, createContext } from 'react'


import Cookies from 'universal-cookie';
 
import axios from '../utils/axios'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  
  const cookies = new Cookies();

  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')



  
  const setToken = (newToken) => cookies.set('token', newToken, { path: '/'})
  // console.log(cookies.get('token'))
  const token = cookies.get('token')


  const deleteToken = () => cookies.set('token', null, { path: '/'})


  const logout = (e) => {
    e.preventDefault();
    deleteToken()
    router.push('/login')
 
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
