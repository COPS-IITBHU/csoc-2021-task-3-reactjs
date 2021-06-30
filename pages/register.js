// importing... 

import { useNoAuthRequired } from "../middlewares/no_auth_required";
import React, { useEffect } from "react";
import Script from "next/script";
import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";



    // this line of code change the title of the page 
    useEffect(()=>{
        document.title="Index"
    })
    



// exporting the default function Register 
export default function Register() {
    useNoAuthRequired();


    // returning whatever we want to meet the requrirements to complete the task 
    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <RegisterForm />
            <Footer/>
        </div>
    );
}
