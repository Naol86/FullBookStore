import { useState } from "react";
import { Link } from "react-router-dom";

function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className={`fixed ${
          isOpen ? "left-48 z-50 top-3" : "left-0 top-3"
        } items-center p-2 ms-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 border-4`}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center mb-5">
            <img src="logo.svg" className="h-6 me-3 sm:h-7" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-50">
              UniSource
            </span>
          </div>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                to="/admin/create-school"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/402648/school.svg"
                  alt="addS"
                  className="flex h-6 me-3 sm:h-7"
                />

                <span className="ms-3 font-semibold">Add School</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/create-department"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/474803/department.svg"
                  alt="addD"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">Add Department</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/create-course"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/492789/books-and-people.svg"
                  alt="addC"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">Add Course</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/create-books"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/293903/books-book.svg"
                  alt="addB"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">Add Book</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                to="/admin/school"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/402648/school.svg"
                  alt="addS"
                  className="flex h-6 me-3 sm:h-7"
                />

                <span className="ms-3 font-semibold">List of School</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/department"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/474803/department.svg"
                  alt="addD"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">List of Department</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/course"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/492789/books-and-people.svg"
                  alt="addC"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">List of Course</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/books"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <img
                  src="https://www.svgrepo.com/show/293903/books-book.svg"
                  alt="addB"
                  className="flex h-6 me-3 sm:h-7"
                />
                <span className="ms-3 font-semibold">List of Book</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-0 sm:ml-64 ${isOpen ? "" : ""}`}>{children}</div>
    </div>
  );
}

export default RootLayout;
