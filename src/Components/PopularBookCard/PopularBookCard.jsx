import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaThumbsUp } from 'react-icons/fa';

const PopularBookCard = ({ book }) => {
    const { _id, cover_photo, book_title, book_author, book_category, upvote = 0, book_overview } = book;

    return (
        <motion.div
            className={`bg-base-100 rounded-xl shadow-lg overflow-hidden max-w-xs mx-auto transition-all border border-primary hover:shadow-xl hover:border-secondary`}
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
            {/* Cover Image */}
            <motion.div className="relative w-full aspect-square bg-base-200 overflow-hidden group">
                <motion.img
                    src={cover_photo}
                    alt={book_title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </motion.div>

            {/* Card Content */}
            <motion.div className="p-5 bg-base-100 shadow-md rounded-t-xl -mt-4 relative z-10">
                <h3 className="text-lg font-bold text-base-content line-clamp-2 mb-1">{book_title}</h3>
                <p className="text-sm italic text-accent mb-2">by {book_author}</p>

                <div className="mb-2 flex items-center justify-between">
                    <span className="badge badge-secondary text-xs px-3 py-1">{book_category}</span>
                    <div className="flex items-center text-sm text-base-content gap-1">
                        <FaThumbsUp className="text-primary" />
                        <span>{upvote}</span>
                    </div>
                </div>

                <p className="text-sm text-base-content mb-4">{book_overview}</p>

                <Link
                    to={`/books/${_id}`}
                    className="btn btn-sm btn-outline border-secondary text-secondary w-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-white hover:border-transparent transition-transform hover:scale-[1.02]"
                >
                    <FaInfoCircle />
                    Details
                </Link>
            </motion.div>
        </motion.div>
    );

};

export default PopularBookCard;