import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

const { token } = useAuth();
const router = useRouter();

console.log("token logged in no_auth_req");
console.log(token);
if(token)
{
    router.push("../pages/index.js")
}