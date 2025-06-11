import { useContext, useEffect, useState } from 'react';
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
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [readingStatusFilter, setReadingStatusFilter] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
                setBooks(res.data);
                setFilteredBooks(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [ user?.accessToken ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleReadingStatusChange = (e) => {
        setReadingStatusFilter(e.target.value);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setReadingStatusFilter('');
    };

    useEffect(() => {
        let filtered = books;

        if (searchTerm) {
            filtered = filtered.filter(
                (book) =>
                    book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.book_author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (readingStatusFilter) {
            filtered = filtered.filter((book) => book.reading_status === readingStatusFilter);
        }

        // SweetAlert for no match
        if ((searchTerm || readingStatusFilter) && filtered.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Books Found',
                text: 'It looks like we couldn’t find any books that match your search and filters. Would you like to try adjusting them or reset your search?',
                confirmButtonColor: '#6366f1',
                showCancelButton: true,
                cancelButtonText: 'Reset Search',
                confirmButtonText: 'Try Again',
                cancelButtonColor: '#ff5c8d',
                customClass: {
                    title: 'text-lg font-semibold text-neutral',
                    content: 'text-base text-gray-600',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    setFilteredBooks(filtered);
                } else if (result.isDismissed) {
                    setSearchTerm('');
                    setReadingStatusFilter('');
                }
            });
        }

        setFilteredBooks(filtered);
    }, [searchTerm, readingStatusFilter, books]);


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <section className="px-6 py-10">
            <Helmet>
                <title>BookShelf</title>
                <meta name="description" content="Explore our collection of books, filter by reading status, and search for your favorite titles." />
            </Helmet>
            <motion.h2
                className="text-4xl font-extrabold mb-8 text-primary text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🗃️    Bookshelf
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
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            </div>

            {/* No Books Message */}
            {filteredBooks.length === 0 && (
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
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {filteredBooks.map((book) => (
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
        </section>
    );
};

export default Bookshelf;