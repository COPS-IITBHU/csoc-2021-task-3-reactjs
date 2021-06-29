 import { useAuth } from "../context/auth";
 import { useRouter } from 'next/router';
 
 /***
 * @todo Redirect the user to main page if token is present.
 */
 
 export default function CheckLogin(){
     const { token }=useAuth();
     const router=useRouter();
 
    if(token!==null)
    {
        router.push('/');
 
    }
     
 
 
 }