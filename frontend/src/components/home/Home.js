import React from 'react'
import Metadata from "../layout/Metadata"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Metadata title={"Home"} />
            <h1>Home</h1>
            <Link to='/me/profile'>My profile</Link>
            <Link to='/me/orders'>My orders</Link>
            <Link to='/admin/orders'>All orders</Link>
        </>
    )
}

export default Home
