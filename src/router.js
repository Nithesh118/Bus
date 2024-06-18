import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import BusListitem from "./components/blog/BusListitem";
import BusDetails from "./components/blog/BusDetails";
import List from './components/blog/List';
import BusBooking from './components/blog/BusBooking'
import MyBookings from './components/blog/MyBookings'
import CreatePost from "./components/blog/CreatePost";
import EditPost from "./components/blog/EditPost";
import ListPost from "./components/blog/ListPost";


const router = createBrowserRouter([
    { path: '', element: <Signup/> },
    { path: '/login', element: <Login/> },
    { path: '/list', element: <List/> },
    { path: '/My', element: <MyBookings/> },
    { path:'/blog/posts/details', element:<BusListitem/>},
    { path: 'blog/posts/:postId', element: <BusDetails/>},
    { path: 'blog/post/:postId', element: <BusBooking/>},
    { path : '/blog/posts/' , element : <ListPost/> },
    { path : 'blog/posts/create' , element : < CreatePost /> },
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},

]);

export default router;