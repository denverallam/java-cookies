import React from 'react'
import Metadata from "../layout/Metadata"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Metadata title={"Home"} />
            <h1>Home</h1>
            <Link to="/admin/new/user">Register user (Admin)</Link>
            <Link to="/admin/users">All users (Admin)</Link>
            <Link to="/">Create Product</Link>
            <Link to="/">Get All Products</Link>
            <Link to="/">Create Service</Link>
            <Link to="/">Get All Services</Link>
        </>
    )
}

export default Home
