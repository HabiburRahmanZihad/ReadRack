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

        // Basic manual validation example (optional)
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

        // Show loading alert (optional)
        Swal.fire({
            title: 'Sending...',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

        // Simulate network request delay
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
        <section className="bg-base-200 py-16 px-6 lg:px-24">
            <Helmet>
                <title>Contact us </title>
                <meta name="description" content="Get in touch with ReadRack. We are here to answer your questions and assist you with any inquiries." />
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
                        We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else—our team is ready to answer all your questions.
                    </p>
                    <div className="space-y-4 text-base-400">
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-primary w-5 h-5" />
                            <span>123 ReadRack Lane, Booktown, BK 10201</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-primary w-5 h-5" />
                            <a href="mailto:contact@readrack.com" className="hover:text-primary">contact@readrack.com</a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-primary w-5 h-5" />
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
                >
                    <div className="form-control">
                        <label htmlFor="name" className="label text-base font-medium text-primary">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email" className="label text-base font-medium text-primary">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="message" className="label text-base font-medium text-primary">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="textarea textarea-bordered w-full"
                            rows="5"
                            placeholder="Your message..."
                            required
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;