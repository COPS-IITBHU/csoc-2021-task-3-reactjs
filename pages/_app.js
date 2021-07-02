import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import Notiflix from 'notiflix'

const configs = {
  position:"right-bottom",
  timeout:2000,
  cssAnimation:true,
  cssAnimationStyle:"from-right",
  showOnlyTheLastOne:true
}

function displaySuccessToast(message)
{
  Notiflix.Notify.success(message,configs);
}

function displayErrorToast(message)
{
  Notiflix.Notify.failure(message,configs);
}

function displayInfoToast(message)
{
  Notiflix.Notify.info(message,configs);
}

function displayWarnToast(message)
{
  Notiflix.Notify.warning(message,configs);
}

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export { MyApp, displayErrorToast, displaySuccessToast, displayWarnToast, displayInfoToast };
