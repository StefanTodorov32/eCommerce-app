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
    console.log(user)
    const handleCreateUser = async (values) => {
        try {
            await authApi.register(values)
            showToastNotification(toast, "Success", "Account successfully created!", "success", 4000, true)
        } catch (err) {
            showToastNotification(toast, "Error", err.message, "error", 4000, true)
        }
        await authApi.updateUserProfile(values)
        await authApi.addUserToUsersCol(values)
    }

    const handleLoginUser = async({ email, password }) => {
        try {
            await authApi.login({ email, password })
            showToastNotification(toast, "Success", "Account successfully logged!", "success", 4000, true)
        } catch (err) {
            showToastNotification(toast, "Error", err.message, "error", 4000, true)
        }
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
            handleLoginUser,
            user,
            signOutUser,
            isAuthenticated: !!user,
            handleProfileUpdate
        }}>
            {children}
        </AuthContext.Provider>
    )
}