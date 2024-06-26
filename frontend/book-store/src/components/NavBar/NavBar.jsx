import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [dropDown, setDropDown] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [dropCategory, setDropCategory] = useState(false);
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API_URL;

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
        // Handle error state if needed
      }
    };
    fetchSchools();
  }, [api, schools]);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hadleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/books?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div>
      <nav
        className={`bg-white border-gray-200 dark:bg-gray-900 transition-all duration-1000 ease-in ${
          isFixed ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''
        }`}
      >
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link
            to='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src='logo.svg' className='h-8' alt='Logo' />
            <span className='self-center text-2xl font-bold whitespace-nowrap dark:text-white'>
              Unisource
            </span>
          </Link>
          <div className='flex md:order-2'>
            <button
              type='button'
              aria-controls='navbar-search'
              aria-expanded={dropDown}
              className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1'
              onClick={toggleDropDown}
            >
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
            <div className='relative hidden md:block'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
                <span className='sr-only'>Search icon</span>
              </div>
              <input
                type='text'
                id='search-navbar'
                className='block w-10/12 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={hadleSearch}
              />
            </div>
            <button
              data-collapse-toggle='navbar-search'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-search'
              aria-expanded={dropDown}
              onClick={toggleDropDown}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out items-center justify-between ${
              dropDown ? 'block max-h-screen opacity-100 ' : 'max-h-0 opacity-0'
            } overflow-hidden w-full md:flex md:w-auto md:order-1 min-[800px]:max-h-screen min-[800px]:opacity-100`}
            id='navbar-search'
          >
            <div className='relative mt-3 md:hidden'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='text'
                id='search-navbar'
                className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search...'
              />
            </div>
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  to='/'
                  className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 font-semibold text-lg'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/books'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold text-lg'
                >
                  Books
                </Link>
              </li>
              <li onMouseLeave={() => setDropCategory(false)}>
                <button
                  id='dropdownNavbarLink'
                  data-dropdown-toggle='dropdownNavbar'
                  className='flex font-semibold items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent   dark:hover:text-white    text-lg'
                  onClick={() => setDropCategory((pre) => !pre)}
                >
                  Category{' '}
                  <svg
                    className='w-2.5 h-2.5 ms-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>
                <div
                  id='dropdownNavbar'
                  className={`z-10 ${
                    dropCategory ? '' : 'hidden'
                  } absolute  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className='py-2 text-sm text-gray-700 dark:text-gray-400'
                    aria-labelledby='dropdownLargeButton'
                  >
                    {schools.map((school, index) => (
                      <li key={school.ID} value={school.ID}>
                        <Link
                          to='/books'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          {school.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href='#'
                  className='block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold text-lg'
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
