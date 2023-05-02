import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [errorMessages, setErrorMessages] = useState(null)
    console.log(errorMessages)
    const [user, setUser] = useState(null)

    const handleCreateUser = async (values) => {
        try {
            await authApi.register(values)
        } catch (err) {
            err.message == "Firebase: Error (auth/email-already-in-use)." ? setErrorMessages("Email already in use!") : null
        }
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