import RegisterForm from '../components/RegisterForm'
import NoAuth from '../middlewares/no_auth_required';

export default function Register() {
  return (
    <NoAuth>
      <div>
        <RegisterForm />
      </div>
    </NoAuth>
  )
}
