import { useAuth } from "../context/auth";
import { useEffect } from "react";
import Router from "next/router";

export default function authRequired(){
    const {token}=useAuth();
    useEffect(()=>{
        if(!token)
        {
            Router.replace("/login/")
        }
    });
}