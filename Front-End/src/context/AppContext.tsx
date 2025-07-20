import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUserCredit } from "../services/creditService";

interface User {
    fullName: string,
    email: string,
}

export interface AppContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    showLogin: boolean
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
    credit: number
    setCredit: React.Dispatch<React.SetStateAction<number>>
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = ({children}: AppContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [credit, setCredit] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {

        const fetchCredit = async () => {
            if (user) {
                const fetchedCredit = await getUserCredit();
                setCredit(fetchedCredit);
            };
        };

        fetchCredit();
    }, [user])


    useEffect(() => {
        if (user) {
            setShowLogin(false);
        }
    }, [user]);

    const value = {
        user, setUser, showLogin, setShowLogin, credit, setCredit, token, setToken
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;