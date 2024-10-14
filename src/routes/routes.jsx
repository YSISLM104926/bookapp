import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Wishlistpage from "../components/Wishlistpage";
import Bookdetailspage from "../components/Bookdetailspage";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/wishlist',
        element: <Wishlistpage />
    },
    {
        path: '/book/:id',
        element: <Bookdetailspage />
    }
])