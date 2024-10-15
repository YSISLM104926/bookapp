import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Heart } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  const handleReload = () => {
    navigate('/', { replace: true })
    window.location.reload()
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              onClick={handleReload}
              className="flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-semibold text-lg">BookHaven</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/wishlist" 
              className="flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}