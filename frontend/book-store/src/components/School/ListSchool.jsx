import { useEffect, useState } from "react";
import School from "./School";

function ListSchool() {
  const [schools, setSchools] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch(`${api}/schools`);
      const data = await response.json();
      setSchools(data);
    };
    fetchSchools();
  }, [api]);

  const handleDelete = (e) => {
    const schoolId = e.target.value;
    const deleteCourse = async () => {
      const response = await fetch(`${api}/schools/${schoolId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newSchools = schools.filter(
          (school) =>
            (school.ID !== schoolId) & (school.ID !== Number(schoolId))
        );
        setSchools(newSchools);
      }
    };
    deleteCourse();
  };

  return (
    <div className="department-container">
      <h1>Schools</h1>
      <ul className="book-list">
        {schools.map((School) => (
          <li key={School.ID} className="book-item">
            <div className="book-view">
              <div className="book-logo">
                <img src="" alt={School.name} />
              </div>
              <div className="book-info">
                <h2>{School.name}</h2>
                <p>{School.description}</p>
              </div>
              <div>
                <button value={School.ID}>edit</button>
                <button value={School.ID} onClick={handleDelete}>
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

export default ListSchool;
