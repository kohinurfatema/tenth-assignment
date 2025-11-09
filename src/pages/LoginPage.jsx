// src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'; // Custom Auth Hook
import toast, { Toaster } from 'react-hot-toast'; // Toast Library
import { FcGoogle } from 'react-icons/fc'; // Google Icon (requires react-icons)

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); // Get the login function from context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await login(email, password); // Call the Firebase login function
            toast.success('Login successful! Welcome back.', { duration: 2000 });
            
            // Navigate to home or intended route after a short delay
            setTimeout(() => {
                navigate('/'); 
            }, 500);

        } catch (error) {
            console.error(error);
            let errorMessage = "Login failed. Please check your credentials.";

            // Firebase error code handling (optional but recommended)
            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Invalid email or password.";
            } else if (error.code === 'auth/too-many-requests') {
                 errorMessage = "Too many failed attempts. Try again later.";
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // NOTE: For Google Login, you would add a similar function 
    // using signInWithPopup(auth, provider) and handle the redirect/popup flow.
    const handleGoogleLogin = () => {
        toast.error("Google Login not yet implemented.");
    };

    return (
        <div className="flex justify-center items-center py-16 bg-base-200 min-h-[80vh]">
            <Toaster position="top-center" /> {/* Toast Container */}
            
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6">Login to EcoTrack</h2>
                    
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
                            placeholder="password" 
                            className="input input-bordered" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Login Button (Email/Password) */}
                    <div className="form-control mt-6">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </div>
                    
                    <div className="divider">OR</div>

                    {/* Google Login Button */}
                    <div className="form-control">
                        <button 
                            type="button" 
                            onClick={handleGoogleLogin} 
                            className="btn btn-outline"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>

                    {/* Links */}
                    <div className="mt-4 text-center text-sm space-y-2">
                        <p>
                            Don't have an account? <Link to="/register" className="link link-primary">Register Here</Link>
                        </p>
                        <p>
                            <Link to="/forgot-password" className="link link-hover text-warning">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;