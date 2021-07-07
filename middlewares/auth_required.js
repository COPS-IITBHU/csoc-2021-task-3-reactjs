import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';
import { useEffect } from "react";

/***
 * @todo Redirect the user to login page if token is not present.
 */

const AuthRequired=(props) => {
    const { token }=useAuth();
    const router=useRouter();
   useEffect(() => {
    if(!token)
    {
        router.replace('/login');
 
    }
    

   },[]);

   return props.children;
   
    


}

export default AuthRequired;



