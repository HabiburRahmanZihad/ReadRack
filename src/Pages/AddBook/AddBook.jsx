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
        <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-6 py-12 bg-base-200">
            <Helmet>
                <title>Add Book</title>
                <meta
                    name="description"
                    content="Add a new book to your bookshelf. Share your reading journey with the world!"
                />
            </Helmet>

            {/* Form Card */}
            <motion.div
                className="w-full max-w-xl p-10 rounded-3xl shadow-2xl border border-primary relative overflow-hidden
          bg-gradient-to-br from-white/30 via-white/10 to-white/5
          backdrop-blur-xl
          text-neutral"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Animated Gradient Circle */}
                <motion.div
                    className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    aria-hidden="true"
                />

                <h2 className="text-4xl font-extrabold text-center text-accent mb-8 tracking-wide drop-shadow-lg flex justify-center items-center gap-3">
                    Add a New Book
                </h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    noValidate
                    aria-label="Add new book form"
                >
                    {/* Dynamic Inputs */}
                    {[
                        { id: "book_title", label: "Book Title", type: "text" },
                        { id: "cover_photo", label: "Cover Photo URL", type: "url" },
                        { id: "total_page", label: "Total Pages", type: "number" },
                        { id: "book_author", label: "Author", type: "text" },
                    ].map(({ id, label, type }) => (
                        <motion.div
                            className="form-control"
                            key={id}
                            {...inputMotionProps}
                            tabIndex={-1}
                        >
                            <label
                                htmlFor={id}
                                className="label font-semibold text-accent tracking-wide"
                            >
                                {label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id={id}
                                name={id}
                                type={type}
                                value={formData[id]}
                                onChange={handleChange}
                                required
                                placeholder={`Enter ${label.toLowerCase()}`}
                                className="input input-bordered w-full bg-base-100 text-neutral border-base-300
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-80
                  transition-shadow duration-300"
                                aria-required="true"
                            />
                        </motion.div>
                    ))}

                    {/* User Info Readonly */}
                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label className="label font-semibold text-accent tracking-wide">
                            Your Email
                        </label>
                        <input
                            type="email"
                            readOnly
                            value={user?.email || ""}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200 text-neutral"
                            aria-readonly="true"
                            tabIndex={-1}
                        />
                    </motion.div>

                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label className="label font-semibold text-accent tracking-wide">
                            Your Name
                        </label>
                        <input
                            type="text"
                            readOnly
                            value={user?.displayName || "Anonymous"}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200 text-neutral"
                            aria-readonly="true"
                            tabIndex={-1}
                        />
                    </motion.div>

                    {/* Select Category */}
                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label className="label font-semibold text-accent tracking-wide">
                            Category
                        </label>
                        <select
                            name="book_category"
                            value={formData.book_category}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-base-100 text-neutral border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-80 transition-shadow duration-300"
                            aria-required="true"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Select Status */}
                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label className="label font-semibold text-accent tracking-wide">
                            Reading Status
                        </label>
                        <select
                            name="reading_status"
                            value={formData.reading_status}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-base-100 text-neutral border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-80 transition-shadow duration-300"
                            aria-required="true"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Overview */}
                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label
                            htmlFor="book_overview"
                            className="label font-semibold text-accent tracking-wide"
                        >
                            Book Overview
                        </label>
                        <textarea
                            id="book_overview"
                            name="book_overview"
                            value={formData.book_overview}
                            onChange={handleChange}
                            placeholder="Write a brief description or notes about the book"
                            rows={4}
                            className="textarea textarea-bordered w-full resize-none bg-base-100 text-neutral border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-80 transition-shadow duration-300"
                        />
                    </motion.div>

                    {/* Upvotes */}
                    <motion.div {...inputMotionProps} tabIndex={-1} className="form-control">
                        <label className="label font-semibold text-accent tracking-wide">Upvotes</label>
                        <input
                            type="number"
                            readOnly
                            value={0}
                            className="input input-bordered w-full cursor-not-allowed bg-base-200 text-neutral"
                            aria-readonly="true"
                            tabIndex={-1}
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={submitting}
                        className="btn w-full text-lg font-semibold flex items-center justify-center gap-3 bg-primary text-base-100 border-none shadow-lg
              hover:brightness-110 active:brightness-90 transition duration-200"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}
                        aria-busy={submitting}
                        aria-disabled={submitting}
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
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-md flex justify-center items-center select-none"
                aria-hidden="true"
            >
                <Player autoplay loop src={addBookAnimation} className="w-72 md:w-80 lg:w-96" />
            </motion.div>
        </section>
    );
};

export default AddBook;