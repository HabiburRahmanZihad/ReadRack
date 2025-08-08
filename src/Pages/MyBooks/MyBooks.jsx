import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Loader/LoadingSpinner";
import { AuthContext } from "../../Provider/AuthContext";
import MyBookSingleCard from "../../Components/MyBookSingleCard/MyBookSingleCard";
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from 'react-helmet-async';

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalBooks: 0
    });

    useEffect(() => {
        if (user?.accessToken) {
            fetchUserBooks();
        } else {
            setLoading(false);
            setError('Please log in to view your books');
        }
    }, [user?.accessToken, refresh]);

    const fetchUserBooks = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20'
            });

            const url = `${import.meta.env.VITE_API_URL}/books/my-books?${params.toString()}`;
            console.log('Fetching URL:', url);

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });

            const { books, totalBooks, totalPages, currentPage } = response.data;

            setBooks(books || []);
            setPagination({
                currentPage: currentPage || 1,
                totalPages: totalPages || 1,
                totalBooks: totalBooks || 0
            });

        } catch (error) {
            console.error("Failed to fetch user books:", error);
            console.error("Error response:", error.response?.data);

            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
            } else if (error.response?.status === 403) {
                setError('You do not have permission to view these books.');
            } else {
                setError('Failed to fetch your books. Please try again.');
            }

            setBooks([]);

            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Failed to fetch your books.",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the book from your collection",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_API_URL}/books/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    }
                );

                Swal.fire("Deleted!", "The book has been removed from your collection.", "success");

                fetchUserBooks(pagination.currentPage);

            } catch (error) {
                console.error("Failed to delete book:", error);
                Swal.fire(
                    "Error",
                    error.response?.data?.message || "Failed to delete the book.",
                    "error"
                );
            }
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchUserBooks(newPage);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error && !user) {
        return (
            <motion.div
                className="p-6 max-w-4xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <p className="text-red-500 text-lg">{error}</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="p-6 max-w-8xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Helmet>
                <title>My Books - Personal Collection</title>
                <meta name="description" content="View and manage your personal book collection." />
            </Helmet>

            {/* Header without search/filter */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">My Book Collection</h1>

                {pagination.totalBooks > 0 && (
                    <p className="text-gray-600">
                        Found {pagination.totalBooks} book{pagination.totalBooks !== 1 ? 's' : ''} in your collection
                    </p>
                )}
            </div>

            {/* Books Grid or Empty State */}
            {books.length === 0 ? (
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-gray-500 text-xl">
                        <Typewriter
                            words={["You haven't added any books yet. Start your collection today!"]}
                            loop={1}
                            cursor
                            cursorStyle="|"
                            typeSpeed={45}
                            deleteSpeed={30}
                            delaySpeed={2000}
                        />
                    </p>
                </motion.div>
            ) : (
                <>
                    {/* Books Grid */}
                    <motion.div
                        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {books.map((book) => (
                            <motion.div
                                key={book._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <MyBookSingleCard book={book} onDelete={handleDelete} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <motion.div
                            className="flex justify-center items-center gap-2 mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 text-gray-700">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}
                </>
            )}
        </motion.div>
    );
};

export default MyBooks;