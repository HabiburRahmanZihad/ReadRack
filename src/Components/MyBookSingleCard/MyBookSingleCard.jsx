import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaPen } from 'react-icons/fa';

const MyBookSingleCard = ({ book, onDelete }) => {
    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-square bg-gray-100">
                <img
                    src={book.cover_photo}
                    alt={book.book_title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                    {book.book_category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-xl font-semibold text-neutral-800 line-clamp-2 mb-1">{book.book_title}</h3>
                    <p className="text-sm text-accent italic mb-2">by {book.book_author}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between gap-3">
                    <Link to={`/update-book/${book._id}`} className="w-full">
                        <button className="btn btn-sm w-full flex items-center justify-center gap-2 text-white bg-warning hover:bg-warning-focus transition">
                            <FaPen className="text-sm" />
                            Update
                        </button>
                    </Link>
                    <button
                        onClick={() => onDelete(book._id)}
                        className="btn btn-sm  flex items-center justify-center gap-2 text-white bg-error hover:bg-error-focus transition"
                    >
                        <FaTrashAlt className="text-sm" />
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MyBookSingleCard;
