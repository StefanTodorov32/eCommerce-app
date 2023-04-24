import { addDoc, collection, getDocs } from "firebase/firestore"
import { auth, db } from "../configurations/firebase"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth"


const productColletionRef = collection(db, 'products')
const usersColletionRef = collection(db, 'users')


export const authApi = {
    register: async ({ email, password, firstName, secondName, photoUrl }) => {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${secondName}`,
            photoURL: photoUrl
        })
        await addDoc(usersColletionRef, {
            email, firstName, secondName, photoUrl
        })
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
    signOut: () => signOut(auth),
    googleSignIn: async () => {
        const provider = new GoogleAuthProvider()
        return await signInWithPopup(auth, provider)
    }
}

export const firestoreService = {
    getProducts: async () => {
        const res = await getDocs(productColletionRef)
        return res.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    },
    getProductById: async (id) => {
        const res = await getDocs(productColletionRef)
        const filtered =  res.docs.filter(doc => doc.id === id ? {
            ...doc.data(),
            id: doc.id
        } : null)[0]
        return filtered.data()
    },

}
