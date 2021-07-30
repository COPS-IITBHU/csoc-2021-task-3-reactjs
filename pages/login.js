import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Script from "next/script";
import { useNoAuthRequired } from "../middlewares/no_auth_required";

export default function Login() {
    useNoAuthRequired();

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <LoginForm />
        </div>
    );
}
