import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListCourse() {
  const [course, setCourse] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`${api}/course`);
      const data = await response.json();
      setCourse(data);
    };
    fetchCourses();
  }, [api]);

  const handleDelete = (e) => {
    const courseId = e.target.value;
    const deleteCourse = async () => {
      const response = await fetch(`${api}/course/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newCourse = course.filter(
          (cour) => (cour.ID !== courseId) & (cour.ID !== Number(courseId))
        );
        setCourse(newCourse);
      }
    };
    deleteCourse();
  };

  return (
    <div className="p-3 m-2 max-w-lg mx-auto border-gray-100	border-solid	border-2 rounded-lg	shadow-xl	">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-900 text-center">
        Courses
      </h1>
      {course.map((cou) => (
        <div
          className="max-w-full p-6 bg-white border rounded-lg dark:bg-gray-100 my-4 shadow-lg"
          key={cou.ID}
        >
          <svg
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          </svg>

          <h5
            className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-800"
            value={cou.ID}
          >
            {cou.name}
          </h5>

          <p className="mb-3 font-normal text-gray-600 dark:text-gray-600">
            {cou.description}
          </p>
          <div className="flex justify-end">
            <button className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
              Edit
            </button>
            <button
              className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
              onClick={handleDelete}
              value={cou.ID}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListCourse;
