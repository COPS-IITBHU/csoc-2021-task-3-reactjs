import LoginForm from '../components/LoginForm'
import NoAuthRequired from '../middlewares/no_auth_required'

export default function Login() {
  return (
    <NoAuthRequired>
      <div>
        <LoginForm />
      </div>
    </NoAuthRequired>
  )
}
