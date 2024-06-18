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
          <img
            src="https://www.svgrepo.com/show/492789/books-and-people.svg"
            alt="addC"
            className="flex h-6 me-3 sm:h-7"
          />

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
            <Link to={`/admin/create-course/${cou.ID}`}>
              <button className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                Edit
              </button>
            </Link>
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
