// importing... 

import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";

import Footer from "../components/Footer";
import Script from "next/script";
import { useNoAuthRequired } from "../middlewares/no_auth_required";






// exporting the function Login 

export default function Login() {
    useNoAuthRequired();

// returning whatever we want to meet our requirements and to complete the task 

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <LoginForm />
            <Footer/>
        </div>
    );
}
