import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore"
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
    register: ({ email, password }) => createUserWithEmailAndPassword(auth, email, password),
    login: ({ email, password }) => signInWithEmailAndPassword(auth, email, password),
    addUserToUsersCol: async (values) => {
        const res = await getDocs(usersColletionRef)
        const data = res.docs
        const isFound = data.findIndex(doc => doc.data().email == values.email)
        if (isFound == -1) {
            await addDoc(usersColletionRef, values)
        } else {
            return
        }
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
    },
    updateUserProfile: ({ firstName, secondName, photoURL }) => updateProfile(auth.currentUser, {
        displayName: `${firstName} ${secondName}`,
        photoURL
    })

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
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)
        return { ...docSnap.data(), id }
    },

}
