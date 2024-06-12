import { useEffect, useState } from "react";

function Course() {
  const api = process.env.REACT_APP_API_URL;

  const [schools, setSchools] = useState({ id: 0, school: [] });
  const [department, setDepartment] = useState({ id: 0, departments: [] });
  const [course, setCourse] = useState({
    name: "",
    description: "",
    code: "",
  });

  useEffect(() => {
    const fetchSchool = async () => {
      const response = await fetch(`${api}/schools`);
      const data = await response.json();
      setSchools((prevSchools) => ({ ...prevSchools, school: data }));
    };
    fetchSchool();
  }, [api]);

  useEffect(() => {
    if (schools.id === 0) return;
    const fetchDepartment = async () => {
      const res = await fetch(`${api}/department/${schools.id}`);
      const data = await res.json();
      setDepartment((prevDepartment) => ({
        ...prevDepartment,
        departments: data,
      }));
    };
    fetchDepartment();
  }, [schools, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting course");
    const postData = async () => {
      const response = await fetch(`${api}/course/${department.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const data = await response.json();
      console.log(data);
    };
    postData();
  };

  return (
    <div className="department-container">
      <form onSubmit={handleSubmit}>
        <h1>course form</h1>
        <div className="form-group">
          <label htmlFor="school">School</label>
          <select
            name="school"
            id="school--id"
            value={schools.id}
            onChange={(e) =>
              setSchools((prevSchools) => ({
                ...prevSchools,
                id: e.target.value,
              }))
            }
          >
            <option>select School</option>
            {schools.school.map((school) => (
              <option key={school.ID} value={school.ID}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department">department</label>
          <select
            name="department"
            id="department"
            value={department.id}
            onChange={(e) =>
              setDepartment((preDep) => ({ ...preDep, id: e.target.value }))
            }
          >
            <option>select department</option>
            {department.departments.map((department) => (
              <option key={department.ID} value={department.ID}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">course Name</label>
          <input
            type="text"
            value={course.value}
            onChange={(e) =>
              setCourse((preCourse) => ({ ...preCourse, name: e.target.value }))
            }
            className="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            type="text"
            value={course.description}
            onChange={(e) =>
              setCourse((preCourse) => ({
                ...preCourse,
                description: e.target.value,
              }))
            }
            className="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">course code</label>
          <input
            type="text"
            value={course.code}
            onChange={(e) =>
              setCourse((preCourse) => ({
                ...preCourse,
                code: e.target.value,
              }))
            }
            className="code"
          />
        </div>
        <button type="submit" className="submit-button">
          submit
        </button>
      </form>
    </div>
  );
}

export default Course;
