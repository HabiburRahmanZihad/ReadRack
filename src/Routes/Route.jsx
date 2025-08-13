import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Home from '../Pages/Home/Home';
import Contact from '../Pages/Contact/Contact';
import LegalDoc from '../Pages/LegalDoc/LegalDoc';
import Error from '../Pages/Error/Error';
import SignIn from '../Pages/Signin/SignIn';
import SignUp from '../Pages/Signup/SignUp';
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword';
import PrivateRoute from './PrivateRoute';
import MyProfile from '../Pages/MyProfile/MyProfile';
import UpdateProfile from '../Pages/UpdateProfile/UpdateProfile';
import Bookshelf from '../Pages/Bookshelf/Bookshelf';
import BookDetails from '../Pages/BookDetails/BookDetails';
import AddBook from '../Pages/AddBook/AddBook';
import MyBooks from '../Pages/MyBooks/MyBooks';
import UpdateBook from '../Pages/UpdateBook/UpdateBook';
import BookQuotesGallery from '../Pages/BookQuotesGallery/BookQuotesGallery';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,


        children: [

            { index: true, element: <Home></Home> },

            { path: 'bookshelf', element: <Bookshelf></Bookshelf> },

            { path: 'books/:id', element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute> },

            { path: 'add-book', element: <PrivateRoute><AddBook></AddBook></PrivateRoute> },

            { path: 'my-books', element: <PrivateRoute><MyBooks></MyBooks></PrivateRoute> },

            { path: 'my-profile', element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute> },

            { path: 'update-profile', element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute> },

            { path: 'update-book/:id', element: <PrivateRoute><UpdateBook></UpdateBook></PrivateRoute> },

            { path: 'about-us', element: <AboutUs></AboutUs> },

            { path: 'contact-us', element: <Contact></Contact> },

            { path: 'legal-doc', element: <LegalDoc></LegalDoc> },

            { path: 'signin', element: <SignIn></SignIn> },

            { path: 'signup', element: <SignUp></SignUp> },

            { path: 'forgot-password', element: <ForgetPassword></ForgetPassword> },

            { path: '*', element: <Error></Error> },

            { path: 'book-quotes', element: <BookQuotesGallery /> },
        ]
    },
]);