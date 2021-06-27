import LoginForm from '../components/LoginForm';
import NoAuth from '../middlewares/no_auth_required';

export default function Login() {
  return (
    <NoAuth>
      <div>
        <LoginForm />
      </div>
    </NoAuth>
  )
}
