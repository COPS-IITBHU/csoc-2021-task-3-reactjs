import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';
import { useEffect } from "react";

/***
 * @todo Redirect the user to login page if token is not present.
 */

const NoAuthRequired=(props) => {
    const { token }=useAuth();
    const router=useRouter();
   useEffect(() => {
    if(token)
    {
        router.replace('/');
 
    }
    

   },[])

   return props.children;
   
    


}
export default NoAuthRequired;



