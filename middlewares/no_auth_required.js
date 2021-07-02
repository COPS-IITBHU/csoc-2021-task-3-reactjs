import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

function NoAuthRequired(props) {
    const { token } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (token)
            router.replace('/')
    }, [])

    return props.children
}

export default NoAuthRequired