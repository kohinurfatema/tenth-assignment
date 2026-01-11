// src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await login(email, password);
            toast.success('Login successful\! Welcome back.', { duration: 2000 });
            navigate(from, { replace: true });

        } catch (error) {
            console.error(error);
            let errorMessage = 'Login failed. Please check your credentials.';

            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } else if (error.code === 'auth/too-many-requests') {
                 errorMessage = 'Too many failed attempts. Try again later.';
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            toast.success('Logged in with Google\!', { duration: 2000 });
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Google sign-in failed. Please try again.');
        } finally {
            setGoogleLoading(false);
        }
    };

    const fillDemoCredentials = (type) => {
        if (type === 'user') {
            setEmail('demo@ecotrack.com');
            setPassword('Demo@123');
            toast.success('Demo User credentials filled!', { duration: 2000 });
        } else if (type === 'manager') {
            setEmail('manager@ecotrack.com');
            setPassword('Manager@123');
            toast.success('Manager credentials filled!', { duration: 2000 });
        } else {
            setEmail('admin@ecotrack.com');
            setPassword('Admin@123');
            toast.success('Admin credentials filled!', { duration: 2000 });
        }
    };

    return (
        <div className="flex justify-center items-center py-16 bg-base-200 min-h-[80vh]">
            <Toaster position="top-center" />
            
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
                    
                    {/* Login Button */}
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
                            disabled={googleLoading}
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            {googleLoading ? "Connecting..." : "Sign in with Google"}
                        </button>
                    </div>

                    {/* Demo Login Buttons */}
                    <div className="mt-4 p-4 bg-base-200 rounded-lg">
                        <p className="text-sm text-center text-base-content/70 mb-3">Quick Demo Access</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("user")}
                                className="btn btn-sm btn-secondary flex-1"
                            >
                                Demo User
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("manager")}
                                className="btn btn-sm btn-warning flex-1"
                            >
                                Demo Manager
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("admin")}
                                className="btn btn-sm btn-accent flex-1"
                            >
                                Demo Admin
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="mt-4 text-center text-sm space-y-2">
                        <p>
                            Do not have an account? <Link to="/register" state={{ from }} className="link link-primary">Register Here</Link>
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
