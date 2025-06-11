import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookCard = ({ book, userEmail, highlight }) => {
    const { _id, cover_photo, book_title, book_author, book_category, upvote, user_email } = book;

    const initialUpvotes = Number.isInteger(upvote) ? upvote : 0;

    const [currentUpvotes, setCurrentUpvotes] = useState(initialUpvotes);
    const [isUpvoting, setIsUpvoting] = useState(false);
    const navigate = useNavigate();

    const handleUpvote = async () => {
        if (!userEmail) {
            Swal.fire({
                title: 'Oops! You need to log in to upvote.',
                text: 'Would you like to log in now?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes, Log In',
                cancelButtonText: 'Maybe Later',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin');
                }
            });
            return;
        }

        if (user_email === userEmail) {
            Swal.fire({
                title: 'Hold up!',
                text: "You can't upvote your own book.",
                icon: 'error',
                confirmButtonText: 'Got it!',
                customClass: {
                    confirmButton: 'btn btn-danger'
                }
            });
            return;
        }

        setIsUpvoting(true);

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/books/upvote/${_id}`, {
                email: userEmail,
            });

            if (response.status === 200) {
                setCurrentUpvotes(currentUpvotes + 1);
                Swal.fire({
                    title: 'Upvoted!',
                    text: 'Thank you for supporting this book!',
                    icon: 'success',
                    confirmButtonText: 'Great!',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                });
            }
        } catch (err) {
            console.error('Error upvoting:', err);
            Swal.fire({
                title: 'Something went wrong.',
                text: 'We couldn\'t upvote at the moment. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay, Thanks!',
                customClass: {
                    confirmButton: 'btn btn-danger'
                }
            });
        } finally {
            setIsUpvoting(false);
        }
    };

    return (
        <motion.div
            className={`bg-base-100 rounded-xl shadow-lg overflow-hidden max-w-xs mx-auto transition-all border ${highlight ? 'border-2 border-yellow-400 bg-yellow-50' : 'border-primary'
                }`}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, when: 'beforeChildren', staggerChildren: 0.2 },
                },
            }}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
        >
            {/* Book cover */}
            <motion.div
                className="relative w-full aspect-square bg-base-200 overflow-hidden group"
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                }}
            >
                <motion.img
                    src={cover_photo}
                    alt={book_title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    whileHover={{ rotateX: 5, scale: 1.05 }}
                    style={{ transformStyle: 'preserve-3d' }}
                />
            </motion.div>

            {/* Book details */}
            <motion.div
                className="p-5 bg-white shadow-md rounded-t-xl -mt-4 relative z-10"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
                <h3 className="text-lg font-bold text-neutral line-clamp-2 mb-1">{book_title}</h3>
                <p className="text-sm italic text-accent mb-2">by {book_author}</p>

                <div className="mb-4">
                    <span className="badge badge-secondary text-xs px-3 py-1">{book_category}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        className="btn btn-sm btn-primary w-full flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                        onClick={handleUpvote}
                    >
                        <FaThumbsUp />
                        {user_email === userEmail ? 'Cannot Upvote Your Own Book' : isUpvoting ? 'Upvoting...' : 'Upvote'}
                    </button>
                    <p className="text-sm text-neutral mt-2">{currentUpvotes} Upvotes</p>

                    <Link
                        to={`/books/${_id}`}
                        className="btn btn-sm btn-outline border-secondary text-secondary w-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-white hover:border-transparent transition-transform hover:scale-[1.02]"
                    >
                        <FaInfoCircle />
                        Details
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BookCard;