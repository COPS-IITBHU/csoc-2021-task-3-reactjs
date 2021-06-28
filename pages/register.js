// importing... 

import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Script from "next/script";
import { useNoAuthRequired } from "../middlewares/no_auth_required";





// exporting the default function Register 
export default function Register() {
    useNoAuthRequired();


    // returning whatever we want to meet the requrirements to complete the task 
    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <RegisterForm />
        </div>
    );
}
