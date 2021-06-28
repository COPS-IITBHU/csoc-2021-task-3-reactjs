import Nav from '../components/Nav'
import RegisterForm from '../components/RegisterForm'
import { NoAuthRequired } from '../middlewares/no_auth_required'

export default function Register() {
  NoAuthRequired();
  return (
    <div>
      <Nav />
      <RegisterForm />
    </div>
  )
}
