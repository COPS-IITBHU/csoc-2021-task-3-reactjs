/***
 * @todo Redirect the user to main page if token is present.
 */
const checkLogin = () => {
    // console.log(typeof(document.cookie));
    if(document.cookie!=='')window.location.href = './'
}

export default checkLogin;