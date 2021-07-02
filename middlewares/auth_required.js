import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

const { token } = useAuth();
const router = useRouter();

console.log("token logged in auth_req");
console.log(token);

if(token === undefined || token === null)
{
    router.push("../pages/login.js")
}