// importing... 

import { useCookies } from "react-cookie";
import { createContext, useContext, useEffect, useState} from "react";





// AppContext section 
const AppContext = createContext({
    token: "",
    logout: () => {},
    login: () => {}
});






// exporting the Functioning function alongwith its declaration and definition 

export function Functioning({ children }) {
    const [token, setToken] = useState(cookies.token);
    const [cookies, setCookies, removeCookies] = useCookies(["token"]);

    const logout = () => {
        setToken("");
        removeCookies("token");
    };
    const login = (token) => {
        setToken(token);
        setCookies("token", token, { path: "/", maxAge: 1296000 });
    };

    useEffect(() => {
        setToken(cookies.token);
    });

    let sharedState = {
        token,logout,login
    };

    return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}






// expoting the fuction useAppContext 
export function useAppContext() {
    return useContext(AppContext);
}
