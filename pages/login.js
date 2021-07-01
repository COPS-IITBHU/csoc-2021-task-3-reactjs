import LoginForm from '../components/LoginForm';
import Script from 'next/script';

export default function Login() {
  return (
    <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css"></link>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js"></Script>
      <LoginForm />
    </div>
  )
}
