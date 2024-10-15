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
        <div className='flex justify-center items-center'>
            <select
                onChange={(e) => setValue(e.target.value)}
                className='w-3/4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                {
                    uniqueTopics.length > 0 ? (
                        uniqueTopics.map((topic, index) => (
                            <option key={index} value={topic}>{topic}</option>
                        ))
                    ) : (
                        <option value="">No topics available</option>
                    )
                }
            </select>
        </div>
    )
};

export default Dropdownlist;
