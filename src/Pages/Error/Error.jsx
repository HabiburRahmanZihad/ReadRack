import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Error = () => {
    return (
        <section className="bg-base-200 min-h-screen flex items-center justify-center px-6">
            <Helmet>
                <title>Error</title>
                <meta name="description" content="Page not found - 404 Error" />
            </Helmet>
            <motion.div
                className="text-center space-y-6 max-w-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                {/* Image */}
                <img
                    src="https://i.ibb.co/VY0WLCxG/image.png"
                    alt="Not Found Illustration"
                    className="mx-auto w-64 sm:w-80 md:w-96"
                />

                {/* Text */}
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <p className="text-2xl text-neutral">Oops! Page not found.</p>
                <p className="text-base text-base-400 max-w-md mx-auto">
                    The page you're looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <Link to="/" className="btn btn-primary mt-4 flex items-center gap-2 justify-center">
                    <FaArrowLeft className="w-4 h-4" />
                    Go Back Home
                </Link>

            </motion.div>
        </section>
    );
};

export default Error;
