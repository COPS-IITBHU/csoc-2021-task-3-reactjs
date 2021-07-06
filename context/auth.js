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
  const token = cookies.token

  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  const getToken = () => (cookies.token)
  const logout = () => {
    deleteToken()
    window.location.href='./login'
  }

  useEffect(() => {
    if (cookies.token!='') {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + cookies.token,
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
        .catch((error) => {})
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        getToken,
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
