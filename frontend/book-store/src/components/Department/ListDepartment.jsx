import { useEffect, useState } from "react";

function ListDepartment() {
  const [department, setDepartment] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`${api}/department`);
      const data = await response.json();
      setDepartment(data);
    };
    fetchDepartment();
  }, [api]);

  const handleDelete = (e) => {
    const deparmentId = e.target.value;
    const deleteCourse = async () => {
      const response = await fetch(`${api}/department/${deparmentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newDepartment = department.filter(
          (dep) => (dep.ID !== deparmentId) & (dep.ID !== Number(deparmentId))
        );
        setDepartment(newDepartment);
      }
    };
    deleteCourse();
  };

  return (
    <div className="department-container">
      <h1>department</h1>
      <ul className="book-list">
        {department.map((dep) => (
          <li key={dep.ID} className="book-item">
            <div className="book-view">
              <div className="book-logo">
                <img src="" alt={dep.name} />
              </div>
              <div className="book-info">
                <h2>{dep.name}</h2>
                <p>{dep.description}</p>
              </div>
              <div>
                <button value={dep.ID}>edit</button>
                <button value={dep.ID} onClick={handleDelete}>
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

export default ListDepartment;
