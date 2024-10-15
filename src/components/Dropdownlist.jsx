import React, { useEffect, useState } from 'react';

const Dropdownlist = ({ value, setValue }) => {
    const [uniqueTopics, setUniqueTopics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BOOK_API}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                localStorage.setItem('dropdownlist', JSON.stringify(result.results));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('dropdownlist');
        if (storedData) {
            const data = JSON.parse(storedData) || [];
            console.log("Parsed data from localStorage:", data);
            const topics = data
                .map(result => result.subjects || [])
                .flat();
            console.log("Extracted topics:", topics);
            const uniqueTopics = [...new Set(topics)];
            console.log("Unique topics:", uniqueTopics);
            setUniqueTopics(uniqueTopics);
        }
    }, [localStorage.getItem('dropdownlist')]);

    return (
        <div className='flex justify-center items-center my-6'>
            <div className='relative w-64'>
                <select
                    onChange={(e) => setValue(e.target.value)}
                    className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                    {uniqueTopics.length > 0 ? (
                        uniqueTopics.map((topic, index) => (
                            <option key={index} value={topic}>{topic}</option>
                        ))
                    ) : (
                        <option value="">No genres available</option>
                    )}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                </div>
            </div>
        </div>
    )
};

export default Dropdownlist;
