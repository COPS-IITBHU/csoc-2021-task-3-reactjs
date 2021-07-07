
export function Authorized(homepage,token,setpagetype){
 if (token) {
   setpagetype("HOME");
   homepage();
 }
}
