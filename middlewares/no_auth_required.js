/***
 * @todo Redirect the user to login page if token is not present.
 */
 import Router from "next/router";
 import { useContext, useEffect, createContext } from "react";


 export function NoAuthRequired() {
    useEffect(() => {
        if (localStorage.token) {
            Router.replace("/");
        }
    });
}
