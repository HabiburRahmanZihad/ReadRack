import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Loader/LoadingSpinner';
import Error from '../../Pages/Error/Error';
import PopularBookCard from '../PopularBookCard/PopularBookCard';

const PopularBooks = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchPopularBooks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/popular`);
            setPopularBooks(res.data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchPopularBooks();
}, []);


    if (loading) return <LoadingSpinner />;
    if (error) return <Error />;

    if (popularBooks.length < 6) {
        return (
            <div className="text-center text-gray-500 py-10">
                Not enough popular books to display.
            </div>
        );
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-10 bg-base-200">
            <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-center text-primary mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🔥 Popular Books
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                {popularBooks.map((book) => (
                    <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <PopularBookCard book={book} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default PopularBooks;