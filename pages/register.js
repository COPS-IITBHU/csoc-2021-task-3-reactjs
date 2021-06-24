import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Script from "next/script";
import { useNoAuthRequired } from "../middlewares/no_auth_required";

export default function Register() {
    useNoAuthRequired();

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <RegisterForm />
        </div>
    );
}
