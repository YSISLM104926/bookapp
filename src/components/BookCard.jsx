import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function BookCard({ res }) {
  const navigate = useNavigate()

  const handleSingleBookShow = () => {
    navigate(`/book/${res.id}`)
  }

  const handleAddBookToStorage = (res) => {
    let storedBooks = JSON.parse(localStorage.getItem('books')) || []
    if (!storedBooks.some(book => book.id === res.id)) {
      storedBooks.push(res)
      localStorage.setItem('books', JSON.stringify(storedBooks))
    }
  }

  return (
    <div className="max-w-sm overflow-hidden shadow-lg border border-gray-400 bg-white transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={res.formats['image/jpeg']}
          alt={res.title}
        />
        <button 
          onClick={() => handleAddBookToStorage(res)} 
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-label="Add to favorites"
        >
          <Heart size={20} className="text-red-500" />
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">{res.title}</div>
        <p className="text-gray-600 text-sm mb-2">ID: {res.id}</p>
        <button 
          onClick={handleSingleBookShow} 
          className="w-full bg-black text-white py-2 px-4  transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  )
}