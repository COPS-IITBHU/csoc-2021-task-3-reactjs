import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
import Script from "next/script";
import no_auth_required from "../middlewares/no_auth_required";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();

    useEffect(() => {
        no_auth_required(router);
    });

    return (
        <div>
            <Script src="/iziToast.min.js" />
            <Nav />
            <RegisterForm />
        </div>
    );
}
