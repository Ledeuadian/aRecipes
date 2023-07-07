'use client'

import { useState, useEffect } from 'react';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page) => {
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.edamam.com/search?data?page=1=&app_id=${process.env.NEXT_PUBLIC_REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_REACT_APP_EDAMAM_API_KEY}&limit=100&`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Render your data here */}
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>

          {/* Pagination controls */}
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </>
      )}
    </div>
  );
};

export default MyPage;