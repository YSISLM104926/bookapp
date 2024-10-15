import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Heart } from 'lucide-react';
const Navbar = () => {
    const handleReload = () => {
        window.location.reload()
    }
    return (
        <div>
            <div className='flex justify-between'>
                <Link onClick={handleReload} to="/" className="flex gap-3">
                    <BookOpen size={24} />
                    <span>Library</span>
                </Link>
                <div className="flex gap-12">
                    <Link to="/">Home</Link>
                    <Link to="/wishlist" className='flex gap-1 items-center'>
                        <Heart size={18} />
                        Wishlist
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar