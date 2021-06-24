import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Script from "next/script";
import no_auth_required from "../middlewares/no_auth_required";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        no_auth_required(router);
    });

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <LoginForm />
        </div>
    );
}
