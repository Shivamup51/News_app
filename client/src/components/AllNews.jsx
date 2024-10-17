import { React, useState, useEffect } from 'react';
import Loader from './Loader';
import Card from './Card';

const AllNews = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 6;

  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);  // Reset the error state before each request

    fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        return response.json();
      })
      .then((myjson) => {
        setTotalResults(myjson.data.totalResults);
        setData(myjson.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });

    // Cleanup on unmount
    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
        {!isLoading ? (
          data.map((element, index) => (
            <Card
              title={element.title}
              description={element.description}
              imgUrl={element.urlToImage}
              publishedAt={element.publishedAt}
              url={element.url}
              author={element.author}
              source={element.source.name}
              key={index}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>

      {!isLoading && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className='pagination-btn text-center'
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className='font-semibold opacity-80'>
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className='pagination-btn text-center'
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
};

export default AllNews;
