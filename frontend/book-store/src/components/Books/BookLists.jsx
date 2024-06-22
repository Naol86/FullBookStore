import { useState, useEffect } from 'react';
import ShowBook from './ShowBook';

function BookLists() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({}); // Filter state to be passed to the API request
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Convert filter object to query string
        const queryString = Object.keys(filter)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`,
          )
          .join('&');
        console.log(queryString);

        // Fetch books with query string
        const response = await fetch(`${api}/books?${queryString}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error state if needed
      }
    };

    fetchBooks();
  }, [api, filter]);

  return (
    <div>
      <div className='flex flex-wrap w-full space-x-0 p-5 justify-center bg-[#47424250] my-2 shadow-lg rounded-xl'>
        {books.map((book, index) => (
          <div
            key={index}
            className='w-1/2 max-[350px]:w-7/12 sm:w-1/3 lg:w-1/4 xl:w-1/5 p-2'
          >
            <div className='h-full min-w-90'>
              <ShowBook book={book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookLists;
