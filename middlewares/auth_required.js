/***
 * @todo Redirect the user to login page if token is not present.
 */



// importing... 
 import { useAppContext } from "../components/AppContext";
 import Router from "next/router";
 import { useEffect } from "react";
 

//  exporting the function useAuthRequired 
 export function useAuthRequired() {
     const app = useAppContext();
     useEffect(() => {
         if (!app.token) {
             Router.replace("/login/");
         }
     });
 }
 