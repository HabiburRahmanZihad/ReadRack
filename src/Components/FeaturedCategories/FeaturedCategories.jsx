import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../Loader/LoadingSpinner';
import Error from '../../Pages/Error/Error';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/categories`);
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to load categories:", err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = () => {
        navigate(`/bookshelf`);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <Error />;
    if (!categories.length) return (
        <div className="text-center text-gray-500 py-10">
            No categories available at the moment.
        </div>
    );

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-10 my-10">
            <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-center text-primary mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                🗂️ Featured Categories
            </motion.h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map(cat => (
                    <motion.div
                        key={cat.category}
                        onClick={handleCategoryClick}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="cursor-pointer bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-base-300 hover:border-primary"
                    >
                        <div
                            className="h-40 bg-cover bg-center"
                            style={{ backgroundImage: `url(${cat.sampleCover})` }}
                        ></div>

                        <div className="p-4 text-center border-t border-base-300">
                            <h3 className="text-lg font-semibold text-neutral mb-1">
                                {cat.category}
                            </h3>
                            <p className="text-sm text-secondary">
                                {cat.count} book{cat.count !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;