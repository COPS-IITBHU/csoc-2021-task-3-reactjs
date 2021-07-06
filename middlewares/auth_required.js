import router from 'next/router'
/***
 * @todo Redirect the user to login page if token is not present.
 */
const checkLogin = (a) => {
    if(a===undefined)router.push('/login')
}

export default checkLogin;