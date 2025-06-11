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
        <section className="min-h-[calc(100vh-300px)] bg-base-200 flex flex-col lg:flex-row items-center justify-center px-2 pb-10 md:pt-10">
            <Helmet>
                <title>Forget Password</title>
                <meta name="description" content="Reset your password for ReadRack. Enter your email to receive a password reset link." />
            </Helmet>
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0">
                <Player autoplay loop src={animationData} className="w-80 h-90" />
            </div>

            {/* Reset Password Form */}
            <div className="w-full lg:w-1/2 max-w-xl bg-white p-4 md:p-10 rounded-xl shadow-2xl border border-primary bg-opacity-90">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <p className="text-sm text-center text-base-400 mt-4">
                    Remember your password?{' '}
                    <Link to="/signin" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default ForgetPassword;