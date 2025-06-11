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
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (!user || !user.email) {
        return <p className="text-center text-3xl mt-10 text-red-500">User not found. Please log in.</p>;
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
            // 1. Update Firebase Profile
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL || null,
            });

            // 2. Update Local User State
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
            // 3. Update in Backend
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8">
            <Helmet>
                <title>Update Profile</title>
                <meta name="description" content="Update your profile information including name and photo URL." />
            </Helmet>
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Photo URL</label>
                    <input
                        type="url"
                        className="input input-bordered w-full"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Profile photo URL"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={
                        !user ||
                        (name === (user.displayName || '') && photoURL === (user.photoURL || ''))
                    }
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;