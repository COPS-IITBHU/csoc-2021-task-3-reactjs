/***
 * @todo Redirect the user to main page if token is present.
 */
import router from 'next/router'
const checkLogin = (a) => {
    if(a!==undefined)router.push('/')
}

export default checkLogin;