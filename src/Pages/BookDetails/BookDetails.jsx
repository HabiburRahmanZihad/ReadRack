import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import LoadingSpinner from '../../Components/Loader/LoadingSpinner';
import Error from '../Error/Error';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const BookDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [editReview, setEditReview] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.accessToken) {
            fetchBookDetails();
        } else {
            setLoading(false);
        }
    }, [id, user?.accessToken, axiosSecure]);

    const hasUserReviewed = user && reviews.some((review) => review.user_email === user.email);

    if (loading) return <LoadingSpinner />;
    if (!book) return <Error message="Unable to load book details. Please try again later." />;

    const { cover_photo, book_title, book_author, reading_status } = book;

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        return format(new Date(isoDate), "MMM d, yyyy 'at' hh:mm a");
    };

    const handleReviewSubmit = async () => {
        if (!user) {
            return Swal.fire({
                icon: 'info',
                title: 'Oops! You need to log in',
                text: 'Log in to post your review. It’s quick and easy!',
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#6366F1',
            });
        }

        if (hasUserReviewed) {
            return Swal.fire({
                icon: 'warning',
                title: 'You’ve already reviewed this book!',
                text: 'It looks like you’ve already shared your thoughts on this one. We appreciate your feedback!',
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#6366F1',
            });
        }

        if (newReview.trim().length < 4) {
            return Swal.fire({
                icon: 'error',
                title: 'Almost there!',
                text: 'Your review is a bit too short. Try adding a bit more detail to help others!',
                confirmButtonText: 'Okay, I’ll add more!',
                confirmButtonColor: '#6366F1',
            });
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
                book_id: id,
                user_email: user.email,
                review_text: newReview,
            });

            const updatedReviews = await axiosSecure.get(`/reviews/${id}`);
            setReviews(updatedReviews.data);
            setNewReview('');

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Review posted!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

        } catch (err) {
            console.error('Error posting review:', err);
            Swal.fire({
                icon: 'error',
                title: 'Uh-oh, something went wrong',
                text: 'We couldn’t post your review. Please try again in a moment!',
                confirmButtonText: 'Try again',
            });
        }
    };

    const handleStatusChange = async (newStatus) => {
        if (reading_status === newStatus) {
            return Swal.fire({
                icon: 'info',
                title: 'Already Updated',
                text: `The book is already marked as "${newStatus}".`,
                confirmButtonText: 'OK',
            });
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}/status`, {
                email: user.email,
                newStatus,
            });

            const updatedBookRes = await axiosSecure.get(`/books/${id}`);
            setBook(updatedBookRes.data);

            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: 'Your reading status has been updated successfully.',
                confirmButtonText: 'Nice!',
            });
        } catch (err) {
            console.error('Error updating status:', err);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Could not update the reading status. Please try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleReviewDelete = async (reviewId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Your review will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
                    data: { user_email: user.email },
                });

                setReviews((prev) => prev.filter((review) => review._id !== reviewId));
                setIsEditing(null);
                setEditReview('');

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review deleted',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } catch (err) {
                console.error('Error deleting review:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed',
                    text: 'There was an error deleting your review.',
                });
            }
        }
    };


    const handleReviewEdit = async (reviewId) => {
        if (editReview.trim().length < 4) {
            return Swal.fire({
                icon: 'error',
                title: 'Review Too Short',
                text: 'Review must be at least 4 characters long.',
                confirmButtonText: 'OK',
            });
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
                user_email: user.email,
                review_text: editReview,
            });

            setReviews((prev) =>
                prev.map((review) =>
                    review._id === reviewId ? { ...review, review_text: editReview } : review
                )
            );
            setIsEditing(null);
            setEditReview('');
            Swal.fire({
                icon: 'success',
                title: 'Review Updated',
                text: 'Your review has been successfully updated.',
                confirmButtonText: 'Done',
            });
        } catch (err) {
            console.error('Error updating review:', err);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was a problem updating your review.',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <motion.section className="p-6 md:p-10 max-w-5xl mx-auto text-neutral">
            <Helmet>
                <title>{book_title}</title>
                <meta name="description" content={`Details for the book: ${book_title} by ${book_author}`} />
            </Helmet>
            <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Left Column: Book Cover + Progress */}
                <motion.div className="w-full md:w-1/3 bg-base-200 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={cover_photo}
                        alt={book_title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />

                    {user?.email === book?.user_email && (
                        <div className="mt-6 px-4 pb-6">
                            <h3 className="text-lg font-semibold text-neutral mb-2">📘 Reading Progress</h3>

                            {/* Tracker */}
                            <div className="flex items-center gap-4 mb-4">
                                {['Want-to-Read', 'Reading', 'Read'].map((status, index) => (
                                    <div key={status} className="flex items-center gap-2">
                                        <motion.div
                                            className={`w-4 h-4 rounded-full`}
                                            animate={{
                                                backgroundColor:
                                                    reading_status === status
                                                        ? '#6366F1' // Tailwind "bg-primary"
                                                        : index <= ['Want-to-Read', 'Reading', 'Read'].indexOf(reading_status)
                                                            ? 'rgba(99, 102, 241, 0.5)' // bg-primary/50
                                                            : '#e5e7eb', // Tailwind "bg-base-300"
                                            }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        <span className="text-sm">{status}</span>
                                        {index < 2 && <div className="w-6 h-0.5 bg-base-300" />}
                                    </div>
                                ))}
                            </div>

                            {/* Status Buttons */}
                            <div className="flex flex-col gap-2">
                                <button onClick={() => handleStatusChange('Reading')} className="btn btn-outline btn-primary w-full">
                                    Mark as Reading
                                </button>
                                <button onClick={() => handleStatusChange('Read')} className="btn btn-outline btn-secondary w-full">
                                    Mark as Read
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Right Column: Details & Reviews */}
                <motion.div className="flex-1 bg-base-100 rounded-xl p-6 shadow-2xl border border-base-300">
                    <h2 className="text-3xl font-extrabold text-primary mb-2">{book_title}</h2>
                    <p className="text-lg text-accent italic mb-1">by {book_author}</p>
                    <span className="badge badge-secondary badge-outline mb-4">{book.book_category}</span>

                    {/* Overview */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-neutral mb-2">📚 Overview</h3>
                        <p className="text-accent leading-relaxed">{book.book_overview}</p>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 space-y-1 text-sm text-accent">
                        <p>
                            <strong>Total Pages:</strong> {book.total_page}
                        </p>
                        <p>
                            <strong>Reading Status:</strong> {book.reading_status}
                        </p>
                        {book.user_name && (
                            <>
                                <p>
                                    <strong>Added By:</strong> {book.user_name}
                                </p>
                                <p>
                                    <strong>Contact:</strong>{' '}
                                    <a href={`mailto:${book.user_email}`} className="text-primary underline">
                                        {book.user_email}
                                    </a>
                                </p>
                            </>
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h4 className="text-xl font-semibold text-neutral mb-3">📝 Reviews</h4>

                        {/* Review Cards */}
                        {/* Review Cards */}
                        {reviews.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-accent py-10"
                            >
                                <motion.p
                                    className="text-lg font-semibold"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                >
                                    😕 No reviews yet!
                                </motion.p>
                                <motion.p
                                    className="text-sm text-neutral mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Be the first to share your thoughts about this book.
                                </motion.p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {reviews.map((review) => (
                                        <motion.div
                                            key={review._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            layout
                                            className="bg-base-200 border border-base-300 p-4 rounded-lg shadow-sm"
                                        >
                                            <p className="text-sm text-neutral mb-1">{review.review_text}</p>
                                            <p className="text-xs text-accent italic mb-2">{formatDate(review.created_at)}</p>

                                            {review.user_email === user?.email && (
                                                <div className="flex gap-4 mt-2 text-sm">
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(review._id);
                                                            setEditReview(review.review_text);
                                                        }}
                                                        className="text-primary"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleReviewDelete(review._id)} className="text-red-500">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}


                        {/* Review Input / Edit */}
                        <motion.div layout className="mt-4">
                            {isEditing ? (
                                <>
                                    <textarea
                                        value={editReview}
                                        onChange={(e) => setEditReview(e.target.value)}
                                        placeholder="Edit your review..."
                                        className="textarea textarea-bordered w-full"
                                    />
                                    <button onClick={() => handleReviewEdit(isEditing)} className="btn btn-primary mt-2">
                                        Update Review
                                    </button>
                                    <button onClick={() => setIsEditing(null)} className="btn btn-outline btn-secondary mt-2 ml-2">
                                        Cancel
                                    </button>
                                </>
                            ) : !hasUserReviewed ? (
                                <>
                                    <textarea
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        placeholder="Write a review..."
                                        className="textarea textarea-bordered w-full"
                                    />
                                    <button onClick={handleReviewSubmit} className="btn btn-primary mt-2">
                                        Post Review
                                    </button>
                                </>
                            ) : (
                                <p className="mt-4 text-sm text-accent italic">You have already submitted a review.</p>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default BookDetails;