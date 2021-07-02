const token = localStorage.getItem("token");
export default function auth_required() {
   if(token){
       window.location.href="/";
   }
}
