import { useContext, useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../../assets/AllPic/noBgColor.png';
import navBg from '../../assets/AllPic/navbg.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
    const [theme, setTheme] = useState('light'); // Light/dark theme

    // Apply theme to HTML root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const links = (
        <div className="flex flex-col lg:flex-row gap-2">
            <NavLink to="/">
                {({ isActive }) => (
                    <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Home</p>
                )}
            </NavLink>
            <NavLink to="/bookshelf">
                {({ isActive }) => (
                    <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Bookshelf</p>
                )}
            </NavLink>
            <NavLink to="/book-quotes">
                {({ isActive }) => (
                    <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Book Quotes</p>
                )}
            </NavLink>
            {user && (
                <>
                    <NavLink to="/add-book">
                        {({ isActive }) => (
                            <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Add Book</p>
                        )}
                    </NavLink>
                    <NavLink to="/my-books">
                        {({ isActive }) => (
                            <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>My Books</p>
                        )}
                    </NavLink>
                    <NavLink to="/my-profile">
                        {({ isActive }) => (
                            <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Profile</p>
                        )}
                    </NavLink>
                </>
            )}
        </div>
    );

    const handleSignOut = async () => {
        try {
            Swal.fire({
                title: 'Signing you out...',
                text: 'Please wait a moment.',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => { Swal.showLoading(); }
            });

            await signOutUser();

            Swal.fire({
                icon: 'success',
                title: 'Successfully signed out!',
                text: 'You have been logged out. Come back soon!',
                showConfirmButton: false,
                timer: 2000,
            });

            navigate('/signin');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops! Something went wrong.',
                text: `Error: ${error.message}. Please try again later.`,
                confirmButtonText: 'Try Again',
            });
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar sticky top-0 z-50 shadow-sm bg-cover bg-center" style={{ backgroundImage: `url(${navBg})` }}>
            {/* Navbar left: dropdown menu + logo */}
            <div className="navbar-start flex items-center gap-2">
                <div className="dropdown">
                    <button onClick={toggleMenu} className="lg:hidden text-white pr-2">
                        <GiHamburgerMenu size={24} />
                    </button>
                    {menuOpen && (
                        <ul className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-10 mt-7 w-52 p-2 shadow" onClick={toggleMenu}>
                            {links}
                        </ul>
                    )}
                </div>

                <img src={logo} alt="Logo" className="w-34 md:w-56" />
            </div>

            {/* Navbar center: desktop links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Navbar right: theme toggle + auth buttons */}
            <div className="navbar-end flex gap-2 items-center">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
                </button>

                {/* Auth Buttons */}
                {!user ? (
                    <NavLink to="/signin">
                        {({ isActive }) => (
                            <button className={`px-2 py-1 flex items-center gap-2 text-xl merriweather rounded transition ${isActive ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}>
                                Sign In
                                <FiLogIn size={20} />
                            </button>
                        )}
                    </NavLink>
                ) : (
                    <button
                        onClick={handleSignOut}
                        className="px-2 py-1 flex items-center gap-2 text-xl merriweather text-white bg-primary rounded hover:bg-primary-dark transition"
                    >
                        Sign Out
                        <FiLogOut size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
