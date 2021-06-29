import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';

/***
 * @todo Redirect the user to login page if token is not present.
 */

export default function CheckLogin(){
    const { token }=useAuth();
    const router=useRouter();

   if(token===null)
   {
       router.push('/login');

   }
    


}



