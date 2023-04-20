import { auth } from "../configurations/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export const authApi = {
    register: async ({ email, password }) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }
}