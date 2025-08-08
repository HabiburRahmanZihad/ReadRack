import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops!',
                text: 'Please fill out all fields before submitting.',
                confirmButtonColor: '#3b82f6',
            });
            setIsSubmitting(false);
            return;
        }

        Swal.fire({
            title: 'Sending...',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for reaching out to us. We will get back to you shortly.',
                confirmButtonColor: '#3b82f6',
            });
            form.reset();
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section className="bg-base-200 py-16 px-6 lg:px-24" aria-label="Contact Us Section">
            <Helmet>
                <title>Contact us</title>
                <meta
                    name="description"
                    content="Get in touch with ReadRack. We are here to answer your questions and assist you with any inquiries."
                />
            </Helmet>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-bold text-primary">
                        <Typewriter
                            words={['Get in Touch']}
                            loop={1}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            delaySpeed={500}
                        />
                    </h2>

                    <p className="text-lg text-neutral max-w-md">
                        We'd love to hear from you. Whether you have a question about features,
                        trials, pricing, or anything else—our team is ready to answer all your questions.
                    </p>
                    <div className="space-y-4 text-base-400">
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-primary w-5 h-5" aria-hidden="true" />
                            <span>123 ReadRack Lane, Booktown, BK 10201</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-primary w-5 h-5" aria-hidden="true" />
                            <a href="mailto:contact@readrack.com" className="hover:text-primary">
                                contact@readrack.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-primary w-5 h-5" aria-hidden="true" />
                            <span>+8801329-453598</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-2xl space-y-6 border border-base-300"
                    onSubmit={handleSubmit}
                    aria-label="Contact form"
                    noValidate
                >
                    <div className="form-control">
                        <label
                            htmlFor="name"
                            className="label text-base font-medium text-primary"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 transition"
                            required
                            disabled={isSubmitting}
                            aria-required="true"
                        />
                    </div>

                    <div className="form-control">
                        <label
                            htmlFor="email"
                            className="label text-base font-medium text-primary"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 transition"
                            required
                            disabled={isSubmitting}
                            aria-required="true"
                        />
                    </div>

                    <div className="form-control">
                        <label
                            htmlFor="message"
                            className="label text-base font-medium text-primary"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Your message..."
                            className="textarea textarea-bordered w-full resize-none
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 transition"
                            required
                            disabled={isSubmitting}
                            aria-required="true"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary-dark'
                            }`}
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        aria-disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;