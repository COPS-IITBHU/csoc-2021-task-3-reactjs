/***
 * @todo Redirect the user to main page if token is present.
 */



// importing... 
 import { useAppContext } from "../components/AppContext";
 import Router from "next/router";
 import { useEffect } from "react";
 


//  exporting the function useNoAuthRequired 
 export function useNoAuthRequired() {
     const app = useAppContext();
     useEffect(() => {
         if (app.token) {
             Router.replace("/");
         }
     });
 }
 