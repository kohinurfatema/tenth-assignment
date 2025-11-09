// src/pages/RegisterPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'; // Custom Auth Hook
import toast, { Toaster } from 'react-hot-toast'; // Toast Library
import { FcGoogle } from 'react-icons/fc'; // Google Icon (requires react-icons)

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Get the register function from context
    const { register } = useAuth(); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Client-Side Validation: Password Check
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return; // Stop the function
        }

        setLoading(true);
        
        try {
            // 2. Call the Firebase register function
            await register(email, password); 
            
            toast.success('Registration successful! Welcome to EcoTrack.', { duration: 2500 });
            
            // 3. Navigate to the dashboard or home after successful registration
            setTimeout(() => {
                navigate('/'); 
            }, 500);

        } catch (error) {
            console.error("Registration Error:", error);
            
            let errorMessage = "Registration failed. Please try again.";

            // Common Firebase error code handling
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email address is already in use.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "The email address is not valid.";
            } else if (error.code === 'auth/weak-password') {
                 errorMessage = "Password should be at least 6 characters.";
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // NOTE: Implement Google Sign-up logic here when you add it
    const handleGoogleSignUp = () => {
        toast.error("Google Sign-up not yet implemented.");
    };

    return (
        <div className="flex justify-center items-center py-16 bg-base-200 min-h-[80vh]">
            <Toaster position="top-center" /> {/* Toast Container */}
            
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleRegister} className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6">Create an EcoTrack Account</h2>
                    
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input 
                            type="email" 
                            placeholder="user@ecotrack.com" 
                            className="input input-bordered" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input 
                            type="password" 
                            placeholder="password (min 6 chars)" 
                            className="input input-bordered" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Confirm Password</span></label>
                        <input 
                            type="password" 
                            placeholder="repeat password" 
                            className="input input-bordered" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Register Button */}
                    <div className="form-control mt-6">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Register Account"}
                        </button>
                    </div>
                    
                    <div className="divider">OR</div>

                    {/* Google Sign-up Button */}
                    <div className="form-control">
                        <button 
                            type="button" 
                            onClick={handleGoogleSignUp} 
                            className="btn btn-outline"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Sign up with Google
                        </button>
                    </div>

                    {/* Links */}
                    <div className="mt-4 text-center text-sm">
                        <p>
                            Already have an account? <Link to="/login" className="link link-primary">Login Here</Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;