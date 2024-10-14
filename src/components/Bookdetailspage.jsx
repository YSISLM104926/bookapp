import { ArrowBigDownDash, FileDown } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Bookdetailspage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch(`https://gutendex.com/books/?ids=${id}`);
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
  }, [id]);


  if (loading) {
    return <div className='flex justify-center items-center h-screen'>loading.....</div>
  }

  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center border rounded-xl shadow py-12">
      {
        data?.results?.map((result) => (
          <div key={result.id} className="max-w-4xl rounded overflow-hidden bg-white m-4 p-4 flex flex-col lg:flex-row">
            <img src={result.formats['image/jpeg']} alt="" className="w-full h-full object-cover rounded-t-lg" />
            <div className="px-6 py-4 flex flex-col justify-between">
              <div>
                <div className="font-bold text-2xl mb-2">{result?.title}</div>
                <p className="text-gray-700 text-base">
                  {
                    result.authors.map((author) => (
                      <>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{author.name}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{author.birth_year} - {author.death_year}</span>
                      </>
                    ))
                  }
                </p>
                <p className="text-gray-700 text-base">Copyright: {result.copyright === false ? 'false' : 'true'}</p>
                <p className="text-gray-700 text-base flex">Download count: {result.download_count}</p>
              </div>
              <div>
                <h4 className="text-gray-700 text-base font-semibold">Languages:</h4>
                <div className="mt-2">
                  {
                    result.languages.map((language) => (
                      <span key={language} className="inline-block bg-red-200 rounded-full 
                      px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">{language}</span>
                    ))
                  }
                </div>
              </div>
              <div>
                <h4 className="text-gray-700 text-base font-semibold">Media type:</h4>
                <div className="mt-2">
                  <span className="inline-block bg-emerald-200 rounded-full px-3 py-1 text-sm 
                  font-semibold text-emerald-700 mr-2 mb-2">{result.media_type}</span>
                </div>
              </div>
              <div>
                <h4 className="text-gray-700 text-base font-semibold">Subjects:</h4>
                <div className="mt-2">
                  {
                    result.subjects.map((subject) => (
                      <span key={subject} className="inline-block bg-blue-200 rounded-full px-3
                       py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{subject}</span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Bookdetailspage