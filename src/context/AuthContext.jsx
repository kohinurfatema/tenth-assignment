// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    updateProfile // <-- Needed to set Name and Photo URL
} from 'firebase/auth';

// 🚨 CRITICAL FIX: The import path is corrected to match your file name 'firebase.config.js'
import { auth } from '../firebase/firebase.config'; 

const AuthContext = createContext();

// Custom hook to use the Auth context easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Authentication Status Listener (runs once on mount)
    useEffect(() => {
        // This function sets up a real-time listener for the user's sign-in state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Stop loading once the initial check is done
        });

        // Cleanup function to detach the listener when the component unmounts
        return unsubscribe;
    }, []);


    // 2. Authentication Functions
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Updated register function to accept and apply name and photoURL
    const register = async (email, password, name, photoURL) => { 
        // 1. Create the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // 2. Update the user profile with name and photo URL
        await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: photoURL || null // Use provided URL or null
        });

        // The onAuthStateChanged listener will automatically pick up the updated user details
        return userCredential;
    };

    const logout = () => {
        return signOut(auth);
    };


    const value = {
        currentUser,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* We only render the children once the initial auth state is loaded */}
            {!loading && children} 
        </AuthContext.Provider>
    );
};