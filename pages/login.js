import Nav from '../components/Nav'
import LoginForm from '../components/LoginForm'
import { NoAuthRequired } from '../middlewares/no_auth_required'

export default function Login() {
  NoAuthRequired();
  return (
    <div>
      <Nav />
      <LoginForm />
    </div>
  )
}
