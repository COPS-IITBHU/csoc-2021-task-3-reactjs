import {useEffect} from 'react';
import { useAuth } from '../context/auth'
import { Authorized } from './no_auth_required'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export function NotAuthorized(token){
    const { loginpage,homepage,setpagetype } = useAuth();
    useEffect(() => {
        if (!token) {
            toast.info("Login to continue.....",{position: toast.POSITION.BOTTOM_RIGHT} );
            loginpage();
        }
        else{
            toast.success("Welcome!!!",{position: toast.POSITION.BOTTOM_RIGHT} );
            Authorized(homepage,token,setpagetype);
        }
    },[token]);
}
