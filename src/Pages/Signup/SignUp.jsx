import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import animationData from '../../assets/lottie/signup.json';
import { AuthContext } from '../../Provider/AuthContext';
import { RiLoginCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// Friendly error parser
const parseAuthError = (message) => {
    if (message.includes('auth/email-already-in-use')) {
        return 'This email is already in use.';
    }
    if (message.includes('auth/invalid-email')) {
        return 'Invalid email format.';
    }
    if (message.includes('auth/weak-password')) {
        return 'Password is too weak. Try a stronger one.';
    }
    if (message.includes('auth/popup-closed-by-user')) {
        return 'Google sign-in popup was closed. Try again.';
    }
    return message;
};

// ✅ Sync user with backend (GET → POST or PATCH)
const syncUserWithDB = async ({ name, email, photoURL }) => {

    const baseURL = import.meta.env.VITE_API_URL;

    try {
        const res = await (`${baseURL}/users/${encodeURIComponent(email)}`);
        if (!res.data) {
            await axios.post(`${baseURL}/users`, {
                name,
                email,
                profile_photo: photoURL || '',
            });
        } else {
            await axios.patch(`${baseURL}/users/${encodeURIComponent(email)}`, {
                name,
                profile_photo: photoURL || '',
            });
        }
    } catch (err) {
        if (err.response?.status === 404) {
            await axios.post(`${baseURL}/users`, {
                name,
                email,
                profile_photo: photoURL || '',
            });
        } else {
            console.error('Error syncing user with DB:', err);
        }
    }
};

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { createUser, updateUserProfile, loginGoogle } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;
        return hasUpper && hasLower && isValidLength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, photoURL, password } = formData;

        if (!validatePassword(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters long and contain both uppercase and lowercase letters.',
            });
            return;
        }

        setLoading(true);
        try {
            await createUser(email, password);
            await updateUserProfile({
                displayName: name.trim(),
                photoURL: photoURL.trim() || null,
            });

            await syncUserWithDB({ name: name.trim(), email, photoURL: photoURL.trim() });

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: `Welcome, ${name.trim()}!`,
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                navigate(from, { replace: true });
            });

            setFormData({ name: '', email: '', photoURL: '', password: '' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: parseAuthError(error.message),
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { email, user } = await loginGoogle();

            if (!email || !user) {
                throw new Error('Google user info missing.');
            }

            const { displayName, photoURL } = user;

            await syncUserWithDB({
                name: displayName || 'Google User',
                email,
                photoURL: photoURL || '',
            });

            Swal.fire({
                icon: 'success',
                title: 'Google Login Successful',
                text: `Welcome, ${displayName || 'User'}!`,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: parseAuthError(error.message || 'Something went wrong.'),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-300px)] bg-base-200 flex flex-col lg:flex-row items-center justify-center px-2 pb-10 md:pt-10">
            <Helmet>
                <title>Sign Up</title>
                <meta name="description" content="Create your account on ReadRack. Join our community of book lovers and start sharing your bookshelf today!" />
            </Helmet>
            {/* Animation */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
            >
                <Player autoplay loop src={animationData} className="w-80 h-90" />
            </motion.div>

            {/* Sign Up Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 max-w-xl bg-white p-4 md:p-10 rounded-xl shadow-2xl border border-primary bg-opacity-90"
            >
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral mb-1">Photo URL</label>
                        <input
                            type="url"
                            name="photoURL"
                            className="input input-bordered w-full"
                            value={formData.photoURL}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                className="input input-bordered w-full pr-10"
                                value={formData.password}
                                onChange={handleChange}
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

                    <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                        <RiLoginCircleLine className="text-lg" />
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                    disabled={loading}
                >
                    <FcGoogle className="text-xl" />
                    <span className="text-sm font-medium text-neutral">
                        {loading ? 'Processing...' : 'Continue with Google'}
                    </span>
                </motion.button>

                <p className="text-sm text-center text-base-400 mt-4">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </section>
    );
};

export default SignUp;