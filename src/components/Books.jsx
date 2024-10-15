import { ChevronLeft, ChevronRight } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import BookCard from './BookCard';
import Dropdownlist from './Dropdownlist';


const Books = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null); // New state for search term

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const encodedSearchTerm = encodeURIComponent(searchTerm).replace(/%20/g, '%2520');
                const baseUrl = 'https://gutendex.com/books/?page=' + page;
                const searchParams = (searchTerm && value) ? `&search=${encodedSearchTerm}&topic=${value}` : (searchTerm || value) ? (searchTerm ? `&search=${encodedSearchTerm}` : `&topic=${value}`) : '';
                const response = await fetch(baseUrl + searchParams, { headers: { 'Content-Type': 'application/json' } });
                window.history.pushState(null, '', `?page=${page}${searchParams}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [page, searchTerm, value]); // Add searchTerm to the dependency array


    // ... existing error and loading handling code ...
    if (loading) {
        return <div className='flex justify-center items-center h-screen'>loading.....</div>
    }

    return (

        <div className='mt-12'>
            <div className='flex gap-2 flex-col-reverse lg:flex-row lg:items-center lg:justify-between'>
                <Dropdownlist value={value} setValue={setValue} />
                <div className='flex justify-center mb-4'> {/* New search input container */}
                    <input
                        type='text'
                        placeholder='Search for a book...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border rounded p-2 mr-2'
                    />
                    <button
                        onClick={() => setPage(1)} // Reset to first page on search
                        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-400'
                    >
                        Search
                    </button>

                </div>
            </div>
            <h1 className='mt-10'>Total Books: {data?.count}</h1>
            <div className='grid grid-cols-2 lg:grid-cols-6'>
                {data?.results?.map((res) => <BookCard key={res?.id} res={res} />)}
            </div>

            <div className='flex gap-5 justify-center mt-10 mb-10'>
                <button onClick={() => handlePageChange(page - 1)} className='bg-gray-300 p-2 rounded hover:bg-gray-200'><ChevronLeft /></button>
                <button className='bg-gray-300 p-2 rounded hover:bg-gray-200'>{page}</button>
                <button onClick={() => handlePageChange(page + 1)} className='bg-gray-300 p-2 rounded hover:bg-gray-200'><ChevronRight /></button>
            </div>
        </div>
    );

}


export default Books;
