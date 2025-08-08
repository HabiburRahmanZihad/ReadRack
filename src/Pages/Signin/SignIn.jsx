import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import animationData from '../../assets/lottie/LoginLott.json';
import { AuthContext } from '../../Provider/AuthContext';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// Friendly error parser
const parseAuthError = (message) => {
    if (message.includes('auth/user-not-found')) return 'No account found with this email. Please sign up first.';
    if (message.includes('auth/wrong-password')) return 'Incorrect password. Please try again.';
    if (message.includes('auth/invalid-email')) return 'Invalid email format.';
    if (message.includes('auth/user-disabled')) return 'This account has been disabled. Contact support.';
    if (message.includes('auth/too-many-requests')) return 'Too many failed attempts. Try again later.';
    if (message.includes('auth/network-request-failed')) return 'Network error. Please check your connection.';
    if (message.includes('auth/popup-closed-by-user')) return 'Google sign-in popup was closed. Try again.';
    return message;
};
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { signInUser, loginGoogle } = useContext(AuthContext);
    const baseURL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a valid email and password.',
            });
            return;
        }

        try {
            setLoading(true);
            await signInUser(email, password);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back!`,
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: parseAuthError(error.message),
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { user, email } = await loginGoogle();

            if (!email) throw new Error('Email not found in Google user');

            const name = user.displayName || user.providerData?.[0]?.displayName || 'Google User';
            const photoURL = user.photoURL || user.providerData?.[0]?.photoURL || '';

            let userExists = false;

            // Check if user already exists
            try {
                const res = await axios.get(`${baseURL}/users/${encodeURIComponent(email)}`);
                userExists = !!res.data;
            } catch (err) {
                if (err.response?.status !== 404) throw err;
            }

            if (!userExists) {
                await axios.post(`${baseURL}/users`, {
                    name,
                    email,
                    profile_photo: photoURL,
                });
            } else {
                await axios.patch(`${baseURL}/users/${encodeURIComponent(email)}`, {
                    name,
                    profile_photo: photoURL,
                });
            }

            Swal.fire({
                icon: 'success',
                title: `Welcome back, ${name}!`,
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            Swal.fire({
                icon: "error",
                title: "Google Sign-in Failed",
                text: parseAuthError(error.message),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-300px)] bg-gradient-to-br from-base-200 to-base-100 flex flex-col lg:flex-row items-center justify-center px-4 pb-10 md:pt-10">
            <Helmet>
                <title>Sign In - ReadRack</title>
                <meta name="description" content="Sign in to ReadRack to access your bookshelf, manage your books, and connect with the reading community." />
            </Helmet>

            {/* Animation section */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
            >
                <Player autoplay loop src={animationData} className="w-80 h-90 drop-shadow-lg" />
            </motion.div>

            {/* Form section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 max-w-xl bg-white/90 p-6 md:p-10 rounded-2xl shadow-2xl border border-primary backdrop-blur-sm"
            >
                <h2 className="text-4xl font-extrabold text-primary mb-8 text-center tracking-tight">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-base-400 hover:text-primary"
                                disabled={loading}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot link */}
                    <div className="text-right text-sm">
                        <Link to="/forgot-password" className="text-base-400 hover:text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Sign in button */}
                    <button
                        type="submit"
                        className="btn w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-md hover:opacity-90 transition flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                        <FiLogIn size={20} />
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition text-neutral"
                    disabled={loading}
                >
                    <FcGoogle className="text-xl" />
                    <span className="text-sm font-medium">
                        {loading ? 'Processing...' : 'Continue with Google'}
                    </span>
                </motion.button>

                {/* Signup */}
                <p className="text-sm text-center text-base-400 mt-6">
                    Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
                </p>
            </motion.div>
        </section>
    );
};

export default SignIn;