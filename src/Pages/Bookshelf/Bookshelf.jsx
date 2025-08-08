import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';
import BookCard from '../../Components/BookCard/BookCard';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../Components/Loader/LoadingSpinner';
import Error from '../Error/Error';
import { AuthContext } from '../../Provider/AuthContext';
import { Helmet } from 'react-helmet-async';

const Bookshelf = () => {
    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [readingStatusFilter, setReadingStatusFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const booksPerPage = 12;

    // Fetch books from backend with server-side pagination and filtering
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
                params: {
                    page: currentPage,
                    limit: booksPerPage,
                    search: searchTerm,
                    status: readingStatusFilter,
                },
            });
            setBooks(res.data.books);
            setTotalPages(res.data.totalPages);
            if (res.data.books.length === 0 && (searchTerm || readingStatusFilter)) {
                Swal.fire({
                    title: 'No results found!',
                    text: 'Try adjusting your search or filters.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, readingStatusFilter]);

    // Call fetchBooks when currentPage, searchTerm, or readingStatusFilter changes
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Reset to page 1 whenever filters or search change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, readingStatusFilter]);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleReadingStatusChange = (e) => setReadingStatusFilter(e.target.value);
    const handleClearFilters = () => {
        setSearchTerm('');
        setReadingStatusFilter('');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <Error />;

    return (
        <section className="px-6 py-10">
            <Helmet>
                <title>BookShelf</title>
                <meta
                    name="description"
                    content="Explore our collection of books, filter by reading status, and search for your favorite titles."
                />
            </Helmet>

            <motion.h2
                className="text-4xl font-extrabold mb-8 text-primary text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Bookshelf
            </motion.h2>

            {/* Search & Filters */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Search */}
                <div className="flex items-center space-x-4 w-full sm:w-1/2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="input input-bordered w-full px-4 pl-10 py-2 border-primary focus:outline-none"
                        />
                        <span className="absolute left-3 top-3 text-gray-500">
                            <FiSearch />
                        </span>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-4 w-full sm:w-1/3">
                    <select
                        value={readingStatusFilter}
                        onChange={handleReadingStatusChange}
                        className="select select-bordered w-full px-4 py-2 border-primary focus:outline-none"
                    >
                        <option value="">Filter by reading status</option>
                        <option value="Read">Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Want-to-Read">Want-to-Read</option>
                    </select>
                </div>

                {/* Clear Filters */}
                <div className="w-full sm:w-auto">
                    <button
                        onClick={handleClearFilters}
                        className="btn btn-outline btn-primary w-full sm:w-auto"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Filter Count */}
            <div className="mb-4 text-gray-600 text-sm">
                Showing {books.length} {books.length === 1 ? 'book' : 'books'}
            </div>

            {/* No Books Message */}
            {books.length === 0 && (
                <motion.div
                    className="text-center text-gray-500 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xl">
                        <Typewriter
                            words={['🚫 No books match your search and filters!']}
                            typeSpeed={50}
                            deleteSpeed={0}
                            delaySpeed={1000}
                            loop={0}
                            cursor
                            cursorStyle="|"
                        />
                    </p>
                </motion.div>
            )}

            {/* Book Grid */}
            <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                {books.map((book) => (
                    <motion.div
                        key={book._id}
                        className="hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <BookCard
                            book={book}
                            userEmail={user?.email}
                            highlight={book.ownerEmail === user?.email}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded border ${currentPage === 1
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-white text-primary border-primary hover:bg-primary hover:text-white transition'
                        }`}
                >
                    Previous
                </button>

                {/* Show page numbers only on md and up */}
                <div className="hidden md:flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 border rounded ${currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'bg-white text-primary border-primary hover:bg-primary hover:text-white transition'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded border ${currentPage === totalPages
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-white text-primary border-primary hover:bg-primary hover:text-white transition'
                        }`}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default Bookshelf;
