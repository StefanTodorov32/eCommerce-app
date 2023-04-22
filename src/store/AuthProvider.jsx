import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/firebaseService";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const createUser = async ({ email, password }) => {
        return await authApi.register({ email, password })
    }
    const loginUser = async ({ email, password }) => {
        return await authApi.login({ email, password })
    }
    const signInWithGoogle = async () => {
        return await authApi.googleSignIn()
    }
    const signOutUser = async () => {
        await authApi.signOut()
    }
    useEffect(() => {
        return () => {
            return authApi.unsubscribe({ setUser })
        }
    }, [])
    console.log(user)
    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser,
            user,
            signOutUser,
            signInWithGoogle,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}