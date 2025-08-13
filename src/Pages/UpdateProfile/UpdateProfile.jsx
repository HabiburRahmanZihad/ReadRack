import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/Loader/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const UpdateProfile = () => {
    const { user, updateUserProfile, loading, setUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user || !user.email) {
        return (
            <p className="text-center text-3xl mt-10 text-red-500">
                User not found. Please log in.
            </p>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            Swal.fire({
                icon: 'error',
                title: 'User Not Found',
                text: 'Your profile information is unavailable. Please log in again.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        if (name === (user.displayName || '') && photoURL === (user.photoURL || '')) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes Detected',
                text: 'Please modify your name or photo URL before updating.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        try {
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL || null,
            });

            setUser({
                ...user,
                displayName: name,
                photoURL: photoURL || null,
            });
        } catch (firebaseError) {
            console.error('Firebase update error:', firebaseError);
            Swal.fire({
                icon: 'error',
                title: 'Firebase Update Failed',
                text: firebaseError.message || 'Could not update Firebase profile.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(user.email)}`, {
                name,
                profile_photo: photoURL || null,
            });

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                background: '#f0fdfa',
                iconColor: '#10b981',
            });

            navigate('/my-profile');
        } catch (apiError) {
            console.error('Backend update error:', apiError);
            Swal.fire({
                icon: 'warning',
                title: 'Partially Updated',
                text: 'Firebase update succeeded, but the backend update failed.',
                footer: apiError.response?.data?.message || apiError.message,
                confirmButtonColor: '#f59e0b',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-base-100 p-8 rounded-xl shadow-lg mt-10 border border-base-300">
            <Helmet>
                <title>Update Profile</title>
                <meta
                    name="description"
                    content="Update your profile information including name and photo URL."
                />
            </Helmet>

            <h2 className="text-3xl font-extrabold mb-8 text-center text-primary">
                Update Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-base-content">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-3 border border-base-300 rounded-lg shadow-sm placeholder:text-base-content/50
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="photoURL" className="block mb-2 text-sm font-semibold text-base-content">
                        Photo URL
                    </label>
                    <input
                        id="photoURL"
                        type="url"
                        className="w-full px-4 py-3 border border-base-300 rounded-lg shadow-sm placeholder:text-base-content/50
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 transition"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Profile photo URL"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg text-white font-semibold transition
                    ${!user || (name === (user.displayName || '') && photoURL === (user.photoURL || ''))
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary-dark'
                        }`}
                    disabled={
                        !user || (name === (user.displayName || '') && photoURL === (user.photoURL || ''))
                    }
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;