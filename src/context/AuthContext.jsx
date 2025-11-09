

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';

// 🚨 CORRECTED IMPORT PATH: MUST MATCH YOUR FILE NAME 'firebase.config.js'
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

    const register = (email, password) => {
        // Note: For registration, you'll typically update the user's profile and save data to Firestore
        return createUserWithEmailAndPassword(auth, email, password);
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