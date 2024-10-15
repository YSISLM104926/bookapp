import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BookCard from './BookCard';
import Dropdownlist from './Dropdownlist';
import Spinner from './spinner/Spinner';

const fetchBooks = async (page, searchTerm, value) => {
    const encodedSearchTerm = encodeURIComponent(searchTerm).replace(/%20/g, '%2520');
    const baseUrl = `${import.meta.env.VITE_BOOK_API}/?page=${page}`;
    console.log('baseUrl', baseUrl);
    const searchParams = (searchTerm && value) ? `&search=${encodedSearchTerm}&topic=${value}` : (searchTerm || value) ? (searchTerm ? `&search=${encodedSearchTerm}` : `&topic=${value}`) : '';
    const response = await fetch(baseUrl + searchParams, { headers: { 'Content-Type': 'application/json' } });
    window.history.pushState(null, '', `?page=${page}${searchParams}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const Books = () => {
    const [page, setPage] = useState(1);
    const [value, setValue] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [search, setSearch] = useState(null);

    const { data, error, isLoading } = useQuery({
        queryKey: ['books', page, searchTerm, value],
        queryFn: () => fetchBooks(page, searchTerm, value),
        keepPreviousData: true
    });

    const handlePageChange = (newPage) => {
        if (newPage < 1) {
            setPage(1);
        } else {
            setPage(newPage);
        }
    };


    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><Spinner /></div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <div className='mt-12'>
            <div className='flex gap-2 flex-col-reverse lg:flex-row lg:items-center lg:justify-between'>
                <Dropdownlist value={value} setValue={setValue} />
                <div className='flex justify-center mb-4'>
                    <input
                        type='text'
                        placeholder='Search for a book...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border rounded p-2 mr-2'
                    />
                    <button
                        onClick={() => setSearchTerm(search)}
                        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-400'
                    >
                        Search
                    </button>
                </div>
            </div>
            <h1 className='mt-10'>Total Books: {data?.count}</h1>
            <div className='w-1/2 mx-auto mt-12 lg:w-full'>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-6'>
                    {data?.results?.map((res) => <BookCard key={res?.id} res={res} />)}
                </div>
            </div>

            <div className='flex items-center justify-center space-x-2 my-8'>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 transition-colors duration-200 hover:bg-gray-100'
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className='flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-medium'>
                    {page}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 transition-colors duration-200 hover:bg-gray-100'
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Books;