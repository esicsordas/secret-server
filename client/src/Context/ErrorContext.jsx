import { createContext, useState, useContext } from "react"

export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
    const [error, setError] = useState(undefined);

    function catchError (error) {
        setError(error);
    }

    return (
        <ErrorContext.Provider value={{ error, catchError }}>{children}</ErrorContext.Provider>
     )
}

export const useError = () => {
    return useContext(ErrorContext)
}

