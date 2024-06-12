import { useEffect, useState } from "react";

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
    <div className="department-container">
      <h1>Courses</h1>
      <ul className="book-list">
        {course.map((cou) => (
          <li key={cou.ID} className="book-item">
            <div className="book-view">
              <div className="book-logo">
                <img src="" alt={cou.name} />
              </div>
              <div className="book-info">
                <h2>{cou.name}</h2>
                <p>{cou.description}</p>
              </div>
              <div>
                <button value={cou.ID}>edit</button>
                <button value={cou.ID} onClick={handleDelete}>
                  delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCourse;
