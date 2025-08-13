import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { Link } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import animationData from '../../assets/lottie/Forgetlott.json';
import { Helmet } from 'react-helmet-async';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { forgetPassword } = useContext(AuthContext);

    const validateEmail = (email) => {
        // Simple regex for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        setIsSubmitting(true);

        Swal.fire({
            title: 'Sending reset email...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await forgetPassword(email);
            Swal.fire({
                icon: 'success',
                title: 'Reset Email Sent',
                text: 'Please check your email to reset your password.',
            }).then(() => {
                window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
            });
            setEmail('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error.message || 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-300px)] bg-gradient-to-br from-base-200 to-base-100 flex flex-col lg:flex-row items-center justify-center px-4 pb-10 md:pt-10">
            <Helmet>
                <title>Forgot Password</title>
                <meta
                    name="description"
                    content="Reset your password for ReadRack. Enter your email to receive a password reset link."
                />
            </Helmet>

            {/* Lottie Animation */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
            >
                <Player autoplay loop src={animationData} className="w-72 h-80 drop-shadow-lg" />
            </motion.div>

            {/* Reset Password Form */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 max-w-xl bg-base-100/90 p-6 md:p-10 rounded-xl shadow-xl border border-primary backdrop-blur-sm"
            >
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    Reset Your Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-md border border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-md hover:opacity-90 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <p className="text-sm text-center text-base-content/70 mt-6">
                    Remember your password?{' '}
                    <Link to="/signin" className="text-primary hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </section>

    );

};

export default ForgetPassword;