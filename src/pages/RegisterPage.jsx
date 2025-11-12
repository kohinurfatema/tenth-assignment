// src/pages/RegisterPage.jsx

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'; 

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    
    const { register, loginWithGoogle } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (passwordRegex.test(value) || value === '') {
            setPasswordError('');
        } else {
            setPasswordError('Password must be 6+ chars and include upper, lower, and special characters.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Client-Side Validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        if (passwordError) {
            toast.error("Please fix password errors before submitting.");
            return;
        }

        setLoading(true);
        
        try {
            // Call the updated register function with all four fields
            await register(email, password, name, photoURL); 
            
            toast.success('Registration successful! Welcome to EcoTrack.', { duration: 2500 });
            
            // Navigate to home after successful registration
            setTimeout(() => {
                navigate(from, { replace: true }); 
            }, 500);

        } catch (error) {
            console.error("Registration Error:", error);
            
            let errorMessage = "Registration failed. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email address is already in use.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "The email address is not valid.";
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            toast.success('Signed up with Google! Welcome to EcoTrack.', { duration: 2500 });
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Sign-up Error:", error);
            toast.error('Google sign-up failed. Please try again.');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-16 bg-base-200 min-h-[80vh]">
            <Toaster position="top-center" />
            
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleRegister} className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6">Join EcoTrack</h2>
                    
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="input input-bordered" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                    
                    {/* Photo URL Field (Optional) */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL (Optional)</span></label>
                        <input 
                            type="url" 
                            placeholder="https://example.com/avatar.jpg" 
                            className="input input-bordered" 
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input 
                            type="password" 
                            placeholder="••••••" 
                            className={`input input-bordered ${passwordError ? 'input-error' : ''}`}
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            required
                        />
                        {/* Inline Error Message */}
                        {passwordError && (
                            <label className="label">
                                <span className="label-text-alt text-error">{passwordError}</span>
                            </label>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Confirm Password</span></label>
                        <input 
                            type="password" 
                            placeholder="••••••" 
                            className={`input input-bordered ${password !== confirmPassword && confirmPassword.length > 0 ? 'input-warning' : ''}`}
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
                            // Disable if loading or if there is a password error
                            disabled={loading || !!passwordError || password !== confirmPassword} 
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
                            disabled={googleLoading}
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            {googleLoading ? 'Connecting...' : 'Sign up with Google'}
                        </button>
                    </div>

                    {/* Links */}
                    <div className="mt-4 text-center text-sm">
                        <p>
                            Already have an account? <Link to="/login" state={{ from }} className="link link-primary">Login Here</Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;