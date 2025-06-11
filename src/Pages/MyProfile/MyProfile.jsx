import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { FiEdit } from 'react-icons/fi';
import { AuthContext } from '../../Provider/AuthContext';
import LoadingSpinner from '../../Components/Loader/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6699', '#33CCFF'];

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookshelf, setBookshelf] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (!user?.email || !user?.accessToken) return;

                const res = await axiosSecure.get(`/books?email=${user.email}`);
                setBookshelf(res.data);
            } catch (err) {
                const message = err.response?.data?.message;
                if (message?.includes("Forbidden access") || message?.includes("User information missing")) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Access Denied',
                        text: message,
                    });
                } else {
                    console.error('Error fetching books:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [user?.email, user?.accessToken, axiosSecure]);


    const booksByCategory = useMemo(() => {
        const count = {};
        bookshelf.forEach(book => {
            const category = book.book_category || 'Uncategorized';
            count[category] = (count[category] || 0) + 1;
        });
        return Object.entries(count).map(([name, value]) => ({ name, value }));
    }, [bookshelf]);

    // Show spinner while loading or if user is not loaded yet
    if (!user || loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg mt-10 border border-base-300">
            <Helmet>
                <title>My profile </title>
                <meta name="description" content="View and manage your profile, books, and bookshelf summary." />
            </Helmet>
            <h1 className="text-4xl font-bold mb-6 text-center text-primary">My Profile</h1>

            {/* User info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                <img
                    src={user.photoURL || 'https://i.ibb.co/gbktSwcj/image.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
                <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                        <h2 className="text-2xl font-semibold text-neutral">{user.displayName || 'No Name'}</h2>
                        <button
                            onClick={() => navigate('/update-profile')}
                            className="btn btn-primary flex items-center gap-2 text-sm sm:text-base"
                        >
                            <FiEdit size={18} />
                            Update Profile
                        </button>
                    </div>
                    <p className="text-lg text-neutral">{user.email}</p>
                    <p className="text-sm text-accent">User ID: {user.uid}</p>
                    <p className={`text-sm font-semibold ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                        Email Verified: {user.emailVerified ? 'Yes' : 'No'}
                    </p>
                </div>
            </div>

            {/* Bookshelf Summary */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-secondary">Bookshelf Summary</h3>
                <p className="text-lg mb-2 text-neutral">
                    Total Books: <strong>{bookshelf.length}</strong>
                </p>

                <ul className="list-disc pl-6 mb-6 space-y-1 text-neutral">
                    {booksByCategory.map(({ name, value }) => (
                        <li key={name}>
                            <strong>{name}</strong>: {value}
                        </li>
                    ))}
                </ul>

                {/* Pie chart */}
                <div style={{ width: '100%', height: 300 }} className="bg-base-200 rounded-md p-4">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={booksByCategory}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {booksByCategory.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;