import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { FaPlusCircle } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import addBookAnimation from "../../assets/lottie/AddBooksLott.json";
import { Helmet } from 'react-helmet-async';

const AddBook = () => {
    const { user, loading } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        book_title: "",
        cover_photo: "",
        total_page: "",
        book_author: "",
        book_category: "Fiction",
        reading_status: "Read",
        book_overview: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const categories = [
        "Fiction",
        "Historical Fiction",
        "Romance",
        "Fantasy",
        "Non-Fiction",
        "Thriller",
        "Science Fiction",
        "Mystery"
    ];

    const statuses = ["Read", "Reading", "Want-to-Read"];

    if (!loading && !user) return <Navigate to="/signin" replace />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            ...formData,
            total_page: Number(formData.total_page),
            user_email: user.email,
            user_name: user.displayName || "Anonymous",
            upvote: 0,
        };

        try {
            // Show loading message while the book is being added
            Swal.fire({
                title: 'Adding your book...',
                text: 'Please wait while we add your book to the shelf.',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading(); // Show the loading spinner
                },
            });

            // Make API call to add the book
            await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload);

            // Success message after book is added
            Swal.fire({
                icon: 'success',
                title: 'Book added successfully!',
                text: 'Your book has been added to your bookshelf. Happy reading!',
                showConfirmButton: false,
                timer: 2500, // Wait 2.5 seconds before closing
            });

            // Reset form after successful submission
            setFormData({
                book_title: "",
                cover_photo: "",
                total_page: "",
                book_author: "",
                book_category: "Fiction",
                reading_status: "Read",
                book_overview: "",
            });
        } catch (err) {
            // Show error message if something went wrong
            Swal.fire({
                icon: 'error',
                title: 'Oops! Something went wrong.',
                text: err.response?.data?.message || "There was an issue adding your book. Please try again later.",
                confirmButtonText: 'Try Again',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const inputMotionProps = {
        whileFocus: { scale: 1.015, transition: { duration: 0.2 } },
        transition: { duration: 0.3 },
    };

    return (
        <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-4 py-10 bg-base-200">
            <Helmet>
                <title>Add Book</title>
                <meta name="description" content="Add a new book to your bookshelf. Share your reading journey with the world!" />
            </Helmet>
            {/* Form Card */}
            <motion.div
                className="w-full max-w-xl p-8 rounded-3xl shadow-xl border relative overflow-hidden border-primary"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: "1px",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20 rounded-full animate-pulse"></div>

                <h2 className="text-3xl font-bold text-center text-accent mb-6 flex items-center justify-center gap-2">
                    Add a New Book
                </h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {[
                        { id: "book_title", label: "Book Title", type: "text" },
                        { id: "cover_photo", label: "Cover Photo URL", type: "url" },
                        { id: "total_page", label: "Total Pages", type: "number" },
                        { id: "book_author", label: "Author", type: "text" }
                    ].map(({ id, label, type }) => (
                        <div className="form-control" key={id}>
                            <label htmlFor={id} className="label font-semibold text-accent">
                                {label} <span className="text-red-500">*</span>
                            </label>
                            <motion.input
                                id={id}
                                name={id}
                                type={type}
                                value={formData[id]}
                                onChange={handleChange}
                                required
                                placeholder={`Enter ${label.toLowerCase()}`}
                                className="input input-bordered w-full bg-base-100 text-neutral border-base-300"
                                {...inputMotionProps}
                            />
                        </div>
                    ))}


                    {/* User Info */}
                    <div className="form-control">
                        <label className="label font-semibold text-accent">Your Email</label>
                        <input
                            type="email"
                            readOnly
                            value={user?.email || ""}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-semibold text-accent">Your Name</label>
                        <input
                            type="text"
                            readOnly
                            value={user?.displayName || "Anonymous"}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200"
                        />
                    </div>


                    {/* Selects */}
                    <div className="form-control">
                        <label className="label font-semibold text-accent">Category</label>
                        <select
                            name="book_category"
                            value={formData.book_category}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-base-100 text-neutral border-base-300"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>


                    <div className="form-control">
                        <label className="label font-semibold text-accent">Reading Status</label>
                        <select
                            name="reading_status"
                            value={formData.reading_status}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-base-100 text-neutral border-base-300"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>



                    {/* Overview */}
                    <div className="form-control">
                        <label htmlFor="book_overview" className="label font-semibold text-accent">
                            Book Overview
                        </label>
                        <textarea
                            id="book_overview"
                            name="book_overview"
                            value={formData.book_overview}
                            onChange={handleChange}
                            placeholder="Write a brief description or notes about the book"
                            rows={4}
                            className="textarea textarea-bordered w-full resize-none bg-base-100 text-neutral border-base-300"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-accent">Upvotes</label>
                        <input
                            type="number"
                            readOnly
                            value={0}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200"
                        />
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={submitting}
                        className="btn w-full text-lg font-semibold flex items-center justify-center gap-2 bg-primary text-base-100 border-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {submitting ? (
                            "Adding..."
                        ) : (
                            <>
                                <FaPlusCircle className="text-xl" />
                                Add Book
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </motion.div>

            {/* Lottie Animation */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md flex justify-center items-center"
            >
                <Player autoplay loop src={addBookAnimation} className="w-72 md:w-80 lg:w-96" />
            </motion.div>
        </section>
    );
};

export default AddBook;