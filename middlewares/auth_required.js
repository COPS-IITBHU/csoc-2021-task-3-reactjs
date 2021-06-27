import { useAuth } from '../context/auth'
/***
 * @todo Redirect the user to login page if token is not present.
 */
const checkLogin = () => {
    // console.log(document.cookie); 
    if(document.cookie=='')window.location.href = './login'
}

export default checkLogin;