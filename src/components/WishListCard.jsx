import React from 'react';
import { Heart } from 'lucide-react';

const WishListCard = ({ d }) => {
    const handleSingleBookShow = () => {
        window.location.href = `/book/${d.id}`
    }
    const handleDeleteBookToStorage = (id) => {
        const localData = JSON.parse(localStorage.getItem('books'));
        const newData = localData.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(newData));
        window.location.reload();
    }
    return (
        <div className="max-w-sm overflow-hidden shadow-lg border border-gray-400 bg-white transition-all duration-300 hover:shadow-xl">
            <div className="relative">
                <img
                    className="w-full h-64 object-cover"
                    src={d.formats['image/jpeg']}
                    alt={d.title}
                />
                <button
                    onClick={() => handleDeleteBookToStorage(d.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Add to favorites"
                >
                    <Heart size={20} className="text-red-500" />
                </button>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 truncate">{d.title}</div>
                <p className="text-gray-600 text-sm mb-2">ID: {d.id}</p>
                <button
                    onClick={handleSingleBookShow}
                    className="w-full bg-black text-white py-2 px-4  transition-colors duration-200"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default WishListCard;