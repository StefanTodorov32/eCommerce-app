import { auth } from "../configurations/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
export const authApi = {
    register: async ({ email, password }) => {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        return res
    },
    login: async ({ email, password }) => {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res
    },
    unsubscribe: ({ setUser }) => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    },
    signOut: () => signOut(auth)
}