import React, { useEffect, useState } from 'react'

const Dropdownlist = ({ value, setValue }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://gutendex.com/books/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); // Add searchTerm to the dependency array

    const topics = data?.results?.map(result => result.subjects).flat();
    const uniqueTopics = [...new Set(topics)];
    return (
        <div className='flex justify-center items-center'>
            <select onChange={(e) => setValue(e.target.value)} name="" id="" className='w-3/4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                {
                    uniqueTopics.map((ut) => (
                        <option key={ut} value={ut}>{ut}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Dropdownlist