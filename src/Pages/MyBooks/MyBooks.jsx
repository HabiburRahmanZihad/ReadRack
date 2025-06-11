import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Loader/LoadingSpinner";
import { AuthContext } from "../../Provider/AuthContext";
import MyBookSingleCard from "../../Components/MyBookSingleCard/MyBookSingleCard";
import { Typewriter } from 'react-simple-typewriter'
import { Helmet } from 'react-helmet-async';

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/books?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            })
            .then((res) => setBooks(res.data))
            .catch(() => Swal.fire("Error", "Failed to fetch your books.", "error"))
            .finally(() => setLoading(false));
    }, [user, refresh]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the book from your collection",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`);
                Swal.fire("Deleted!", "The book has been removed from your collection.", "success");
                setRefresh((prev) => !prev);
            } catch (error) {
                console.error("Failed to delete book:", error);
                Swal.fire("Error", "Failed to delete the book.", "error");
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <motion.div
            className="p-6 max-w-8xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Helmet>
                <title>My Books</title>
                <meta name="description" content="View and manage your personal book collection." />
            </Helmet>


            {books.length === 0 ? (
                <motion.p
                    className="text-center text-gray-500 mt-16 text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Typewriter
                        words={["You haven't added any books yet. Start your collection today!"]}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={45}
                        deleteSpeed={30}
                        delaySpeed={2000}
                    />
                </motion.p>
            ) : (
                <motion.div
                    className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
            )}
        </motion.div>
    );
};

export default MyBooks;
