import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AppContext = createContext({
    token: "",
    logout: () => {},
    login: () => {}
});

export function AppWrapper({ children }) {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    });
    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
    };
    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };
    let sharedState = {
        token,
        logout,
        login
    };

    return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    return useContext(AppContext);
}
