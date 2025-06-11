import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import Swal from "sweetalert2";
import { FaSave, FaSpinner } from "react-icons/fa";
import animationData from "../../assets/lottie/updatebookLott.json";
import LoadingSpinner from "../../Components/Loader/LoadingSpinner";
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        book_title: "",
        cover_photo: "",
        total_page: "",
        book_author: "",
        book_category: "Fiction",
        reading_status: "Read",
        book_overview: "",
    });

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
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axiosSecure.get(`/books/${id}`);
                if (res.data) {
                    setFormData({
                        ...res.data,
                        total_page: res.data.total_page.toString()
                    });
                } else {
                    throw new Error("No book data found");
                }
            } catch (err) {
                Swal.fire("Error", "Failed to load book data", "error");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id, axiosSecure]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const pages = Number(formData.total_page);
        if (isNaN(pages) || pages <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Page Count',
                text: 'Please enter a valid positive number for total pages.',
                confirmButtonColor: '#f59e0b',
                backdrop: true,
            });
            setSubmitting(false);
            return;
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, {
                ...formData,
                book_title: formData.book_title.trim(),
                cover_photo: formData.cover_photo.trim(),
                book_author: formData.book_author.trim(),
                book_overview: formData.book_overview.trim(),
                total_page: pages,
            });

            if (response.data?.message === 'Book updated successfully') {
                Swal.fire({
                    icon: 'success',
                    title: 'Book Updated!',
                    text: 'Your changes have been saved successfully.',
                    timer: 1800,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    background: '#f0fdfa',
                    iconColor: '#10b981',
                });
                navigate("/my-books");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'Something went wrong while updating the book.',
                    confirmButtonColor: '#d33',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Error',
                text: err.response?.data?.message || 'An unexpected error occurred.',
                confirmButtonColor: '#d33',
            });
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) return <LoadingSpinner />;


    return (
        <section className="min-h-[calc(100vh-200px)] flex flex-col lg:flex-row items-center justify-center px-4 py-10 gap-10">
            <Helmet>
                <title>Update book </title>
                <meta name="description" content="Update your book details easily with our user-friendly interface. Modify title, author, cover photo, and more." />
            </Helmet>

            <motion.div
                className="w-full lg:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Player autoplay loop src={animationData} className="w-80 h-80" />
            </motion.div>

            <motion.div
                className="w-full lg:w-1/2 max-w-xl p-8 rounded-3xl shadow-xl border relative overflow-hidden border-primary"
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

                <h2 className="text-3xl font-bold text-center text-accent mb-6">
                    Update Book
                </h2>


                <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                        { id: "book_title", label: "Book Title", type: "text" },
                        { id: "cover_photo", label: "Cover Photo URL", type: "url" },
                        { id: "total_page", label: "Total Pages", type: "number" },
                        { id: "book_author", label: "Author", type: "text" },
                    ].map(({ id, label, type }) => (
                        <div className="form-control" key={id}>
                            <label htmlFor={id} className="label font-semibold text-accent">
                                {label}
                            </label>
                            <input
                                id={id}
                                name={id}
                                type={type}
                                value={formData[id]}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                    ))}


                    <div className="form-control">
                        <label className="label font-semibold text-accent">Category</label>
                        <select
                            name="book_category"
                            value={formData.book_category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
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
                            className="select select-bordered w-full"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>


                    <div className="form-control">
                        <label htmlFor="book_overview" className="label font-semibold text-accent">
                            Book Overview
                        </label>
                        <textarea
                            id="book_overview"
                            name="book_overview"
                            rows="4"
                            value={formData.book_overview}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full resize-none"
                        />
                    </div>


                    <motion.button
                        type="submit"
                        disabled={submitting}
                        className="btn w-full text-lg font-semibold flex items-center justify-center gap-2 bg-primary text-base-100 border-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {submitting ? <FaSpinner className="animate-spin text-white" /> : <FaSave />}
                        {submitting ? "Saving..." : "Save Changes"}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default UpdateBook;