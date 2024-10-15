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
        <div key={d.id}>
            
            <div className='grid grid-cols-5'>
                <div className=' mt-12 border w-48 relative p-3'>
                    <h1 className='font-thin'>id: {d.id}</h1>
                    <div className='relative'>
                        <img
                            className='w-full h-48 object-cover'
                            src={d.formats['image/jpeg']}
                            alt=""
                        />
                        <div onClick={() => handleDeleteBookToStorage(d.id)} className='absolute bottom-2 right-2'>
                            <Heart size={23} className='bg-green-500 hover:bg-gray-700 text-white hover:cursor-pointer rounded-full p-1' />
                        </div>
                    </div>
                    <h1 className='w-44'>Title: {d.title.slice(0, 10)}</h1>
                    <button onClick={handleSingleBookShow}  className='bg-gray-200 hover:bg-gray-100 w-40 mt-1'>
                        View details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishListCard;