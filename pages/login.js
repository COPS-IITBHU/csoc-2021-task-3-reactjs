// importing... 

import React, { useEffect } from "react";
import { useNoAuthRequired } from "../middlewares/no_auth_required";
import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";








// exporting the function Login 

export default function Login() {
    useNoAuthRequired();
    // this line of code change the title of the page 
    useEffect(()=>{
        document.title="Login Page"
    })
    
    // returning whatever we want to meet our requirements and to complete the task 
    
    return (
        <div>
            <Nav />
            <LoginForm />
            <Footer/>
        </div>
    );
}
