import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ReactNotification />
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
