// importing... 

import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";





// AppContext section 
const AppContext = createContext({
    token: "",
    logout: () => {},
    login: () => {}
});






// exporting the AppWrapper function alongwith its declaration and definition 

export function AppWrapper({ children }) {
    const [cookies, setCookies, removeCookies] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);



    useEffect(() => {
        setToken(cookies.token);
    });
    const logout = () => {
        setToken("");
        removeCookies("token");
    };
    const login = (token) => {
        setToken(token);
        setCookies("token", token, { path: "/", maxAge: 1296000 });
    };
    let sharedState = {
        token,
        logout,
        login
    };

    return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}






// expoting the fuction useAppContext 
export function useAppContext() {
    return useContext(AppContext);
}