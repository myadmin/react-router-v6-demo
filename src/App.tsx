import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import router from "./router";
import './App.css';

interface ContextProps {
    login?: boolean;
    handleLogin?: () => void;
}

export const MyContext = React.createContext<ContextProps>({});

const App = () => {
    const element = useRoutes(router);
    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin(true);
    }

    return (
        <MyContext.Provider value={{ login, handleLogin }}>
            {element}
        </MyContext.Provider>
    );
}

export default App;
