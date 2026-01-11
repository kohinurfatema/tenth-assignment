// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';

// 🚨 CRITICAL FIX: The import path is corrected to match your file name 'firebase.config.js'
import { auth } from '../firebase/firebase.config'; 

const AuthContext = createContext();

// Custom hook to use the Auth context easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

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

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        
        // Save/update user in MongoDB
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            await fetch(apiUrl + '/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: 'user',
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            });
        } catch (error) {
            console.error('Error saving Google user to MongoDB:', error);
        }
        
        return result;
    };

    // Updated register function to accept and apply name and photoURL
    const register = async (email, password, name, photoURL) => {
        // 1. Create the user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // 2. Update the user profile with name and photo URL
        await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: photoURL || null
        });

        // 3. Save user to MongoDB
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            await fetch(apiUrl + '/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    displayName: name,
                    photoURL: photoURL || `https://i.pravatar.cc/150?u=${email}`,
                    role: 'user',
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            });
        } catch (error) {
            console.error('Error saving user to MongoDB:', error);
        }

        return userCredential;
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);


    const value = {
        currentUser,
        user: currentUser, // Alias for compatibility
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-success" aria-label="Loading application" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};