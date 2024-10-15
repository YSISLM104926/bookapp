import React, { useEffect } from 'react'
import WishListCard from './WishListCard';
import Navbar from '../shared/Navbar';

const Wishlistpage = () => {
  const data = JSON.parse(localStorage.getItem('books')) || [];
  useEffect(() => {
    console.log(data);
  }, [data])
  return (
    <div>
      <Navbar />
      <h1 className='mt-20'>Wishlist</h1>
      <div className='w-1/2 mx-auto ms-[60px] lg:w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-6'>
          {
            data?.map((d) => (
              <>
                <WishListCard d={d} keys={d.id} />
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Wishlistpage