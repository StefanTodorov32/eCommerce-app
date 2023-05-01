import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const createUser = async (values) => {
        return await authApi.register(values)
    }
    const loginUser = async ({ email, password }) => {
        return await authApi.login({ email, password })
    }
    const signInWithGoogle = async () => {
        return await authApi.googleSignIn()
    }
    const signOutUser = async () => {
        return await authApi.signOut()
    }
    const handleProfileUpdate = async (values, actions) => {
        await authApi.updateUserProfile(values)
        navigate("/")
        actions.setSubmitting(false);
    }
    useEffect(() => {
        return () => {
            return authApi.unsubscribe({ setUser })
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser,
            user,
            signOutUser,
            signInWithGoogle,
            isAuthenticated: !!user,
            handleProfileUpdate
        }}>
            {children}
        </AuthContext.Provider>
    )
}