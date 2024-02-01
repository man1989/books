import {createBrowserRouter, BrowserRouter as Router, Route, Routes, RouterProvider, Link} from "react-router-dom";
// import Upload from "./Upload.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home key="Home"/>
    },
    {
        path: "/login",
        element: <Login key="Login"/>
    } 
]);

export default function App(){
    return (
        <RouterProvider router={router}/>
    )
}