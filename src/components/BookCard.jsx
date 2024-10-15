import React from 'react';
import { Link, Router } from 'react-router-dom';
import { Heart } from 'lucide-react';

const BookCard = ({ res }) => {
    const handleSingleBookShow = () => {
        window.location.href = `/book/${res.id}`
    }
    const handleAddBookToStorage = (res) => {
        let storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        if (!storedBooks.includes(res)) {
            storedBooks.push(res);
            localStorage.setItem('books', JSON.stringify(storedBooks));
        }
    }
    return (
        <div>
            <div className='grid grid-cols-5'>
                <div className=' mt-12 border w-48 relative p-3'>
                    <h1 className='font-thin'>id: {res.id}</h1>
                    <div className='relative'>
                        <img
                            className='w-full h-48 object-cover'
                            src={res.formats['image/jpeg']}
                            alt=""
                        />
                        <div onClick={() => handleAddBookToStorage(res)} className='absolute bottom-2 right-2'>
                            <Heart size={23} className='bg-black hover:bg-gray-700 text-white hover:cursor-pointer rounded-full p-1' />
                        </div>
                    </div>
                    <h1 className='w-44'>Title: {res.title.slice(0, 10)}</h1>
                    {/* <h1 className='w-44'>Name: {res.authors[0].name}</h1> */}

                    <button onClick={handleSingleBookShow} className='bg-gray-200 hover:bg-gray-100 w-40 mt-1'>
                        View details
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BookCard;