import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';
import { useEffect } from "react";

/***
 * @todo Redirect the user to login page if token is not present.
 */

export default function AuthRequired(){
    const { token }=useAuth();
    const router=useRouter();
   useEffect(() => {
    if(token===null)
    {
        router.replace('/login/');
 
    }

   })
   
    


}



