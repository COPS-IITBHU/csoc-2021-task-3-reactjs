import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Script from "next/script";

export default function Login() {
    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <LoginForm />
        </div>
    );
}
