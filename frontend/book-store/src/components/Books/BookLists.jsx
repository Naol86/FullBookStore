import { useState, useEffect } from 'react';
import ShowBook from './ShowBook';
import { useLocation, useParams } from 'react-router-dom';

function BookLists() {
  const location = useLocation();
  const search = location.search.split('=')[1];
  const [books, setBooks] = useState([]);
  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState({
    // Default filter state
    // limit: 10,
    // offset: 0,
    search: search ? search : '',
  }); // Filter state to be passed to the API request
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setFilter((prevFilter) => ({
      search,
    }));
  }, [location.search]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${api}/schools`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }

        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };
    fetchSchools();
  }, [api]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${api}/department/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, [api, filter.school_id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${api}/course/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [api, filter.department_id]);

  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const getFilterOptions = (filter) => {
    switch (filter) {
      case 'Course':
        return courses;
      case 'Department':
        return departments;
      case 'School':
        return schools;
      default:
        return [];
    }
  };

  useEffect(() => {
    setIsOpen(false);
    const fetchBooks = async () => {
      try {
        // Convert filter object to query string
        const queryString = Object.keys(filter)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`,
          )
          .join('&');
        console.log(queryString, 'queryString');

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // console.log(schools);

  return (
    <div>
      <div className='relative z-10'>
        {location.pathname !== '/' && (
          <div className='p-1'>
            <button
              onClick={toggleDropdown}
              className='px-4 py-2 bg-gray-800 text-white rounded-md shadow-md'
            >
              Filter <span className='ml-2'>&#x25BC;</span>
            </button>
            {isOpen && (
              <div className='mt-4 absolute w-full max-w-md bg-gray-700 text-gray-200 rounded-lg shadow-lg'>
                <div className='p-4'>
                  {['Course', 'Department', 'School'].map((filter) => (
                    <div key={filter}>
                      <div
                        className='flex justify-between items-center py-2 border-t border-gray-600 cursor-pointer'
                        onClick={() => toggleCategory(filter)}
                      >
                        <span>{filter}</span>
                        <span className='text-xl'>
                          {expandedCategory === filter ? '▲' : '▼'}
                        </span>
                      </div>
                      {expandedCategory === filter && (
                        <div className='ml-4 mt-2'>
                          {getFilterOptions(filter).map((option) => (
                            <div key={option.ID} className='py-1'>
                              <button
                                onClick={(e) => {
                                  setFilter({
                                    [filter.toLowerCase() + '_id']: option.ID,
                                  });
                                }}
                              >
                                {option.name}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button type='submit' className='btn'>
                  submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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
