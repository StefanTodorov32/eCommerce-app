import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBx9be3vYsJpb3I3CfspK9k8RMS2ve-RY8",
    authDomain: "ecommerce-befc2.firebaseapp.com",
    projectId: "ecommerce-befc2",
    storageBucket: "ecommerce-befc2.appspot.com",
    messagingSenderId: "484411170310",
    appId: "1:484411170310:web:90fff09f3ca097a0d5ad87",
    measurementId: "G-JJQ5214ZMW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)