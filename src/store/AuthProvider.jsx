import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/firebaseService";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const createUser = async ({ email, password }) => {
        return await authApi.register({ email, password })
    }
    const loginUser = async ({ email, password }) => {
        return await authApi.login({ email, password })
    }
    useEffect(() => {
        return () => {
            return authApi.unsubscribe({ setUser })
        }
    })
    const signOutUser = async () => {
        await authApi.signOut()
    }
    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser,
            user,
            signOutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}