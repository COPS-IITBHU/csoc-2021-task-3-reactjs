// importing... 

import { useNoAuthRequired } from "../middlewares/no_auth_required";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";







// exporting the default function Register 
export default function Register() {
    useNoAuthRequired();
    // this line of code change the title of the page 
    useEffect(()=>{
        document.title="Index"
    })


    // returning whatever we want to meet the requrirements to complete the task 
    return (
        <div>
            <Nav />
            <RegisterForm />
            <Footer/>
        </div>
    );
}
