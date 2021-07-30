import { useAppContext } from "../context/AppContext";
import Router from "next/router";
import { useEffect } from "react";

export function useAuthRequired() {
    const app = useAppContext();
    useEffect(() => {
        if (!app.token) {
            Router.replace("/login/");
        }
    });
}
