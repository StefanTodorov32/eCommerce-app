import { auth } from "../configurations/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
export const authApi = {
    register: async ({ email, password }) => {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        return res
    },
    login: async ({ email, password }) => {
    }
}