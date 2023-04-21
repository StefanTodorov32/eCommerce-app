import { createContext, useContext, useState } from "react";
import { authApi } from "../services/firebaseService";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const createUser = async ({ email, password }) => {
        const userInfo = await authApi.register({ email, password })
        return setUser(userInfo.user)
    }
    const loginUser = () => {
        return ''
    }
    console.log(user)
    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}