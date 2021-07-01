import RegisterForm from '../components/RegisterForm'
import NoAuthRequired from '../middlewares/no_auth_required'

export default function Register() {
  return (
    <NoAuthRequired>
      <div>
        <RegisterForm />
      </div>
    </NoAuthRequired>
  )
}
