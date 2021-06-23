import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Script from "next/script";

export default function Register() {
    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <RegisterForm />
        </div>
    );
}
