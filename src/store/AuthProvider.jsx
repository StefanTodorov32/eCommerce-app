import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { showToastNotification } from "../utils/toast";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const toast = useToast()
    const [user, setUser] = useState(null)

    const handleCreateUser = async (values) => {
        try {
            await authApi.register(values)
        } catch (err) {
            showToastNotification(toast, "Error", err.message, "error", 4000, true)
        }
        await authApi.updateUserProfile(values)
        await authApi.addUserToUsersCol(values)
    }

    const loginUser = ({ email, password }) => authApi.login({ email, password })
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
            handleCreateUser,
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