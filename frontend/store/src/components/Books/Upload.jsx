import { useEffect, useState } from "react";
import { Books } from "..";

function Upload() {
  const [schoolNames, setSchoolNames] = useState([]);
  const [schoolID, setSchoolId] = useState(0);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [departmentID, setDepartmentId] = useState(0);
  const [courseNames, setCourseNames] = useState([]);
  const [courseID, setCourseID] = useState(0);

  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSchool = async () => {
      const response = await fetch(`${api}/schools`);
      const data = await response.json();
      setSchoolNames(data);
    };
    fetchSchool();
  }, [api]);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`${api}/department/${schoolID}`);
      const data = await response.json();
      setDepartmentNames(data);
    };
    if ((schoolID !== "0") & (schoolID !== 0)) {
      fetchDepartment();
    }
  }, [schoolID, api]);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`${api}/course/${departmentID}`);
      const data = await response.json();
      setCourseNames(data);
    };
    if ((departmentID !== "0") & (departmentID !== 0)) {
      fetchCourse();
    }
  }, [departmentID, api]);

  const handleSubmit = () => {
    const selectedSchool = schoolNames.find(
      (school) => school.ID === parseInt(schoolID)
    );
    const selectedDepartment = departmentNames.find(
      (department) => department.ID === parseInt(departmentID)
    );
    const selectedCourse = courseNames.find(
      (course) => course.ID === parseInt(courseID)
    );

    console.log(
      "Selected School:",
      selectedSchool ? selectedSchool.name : "N/A"
    );
    console.log(
      "Selected Department:",
      selectedDepartment ? selectedDepartment.name : "N/A"
    );
    console.log(
      "Selected Course:",
      selectedCourse ? selectedCourse.name : "N/A"
    );
  };

  return (
    <div className="department-container">
      <h1>Upload book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="school">School</label>
          <select
            name="school"
            id="school--id"
            value={schoolID}
            onChange={(e) => setSchoolId(e.target.value)}
          >
            <option> select School</option>
            {schoolNames.map((school) => (
              <option key={school.ID} value={school.ID}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="school">Department</label>
          <select
            name="school"
            id="school--id"
            value={departmentID}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option> select Department</option>
            {departmentNames.map((department) => (
              <option key={department.ID} value={department.ID}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="school">Course</label>
          <select
            name="school"
            id="school--id"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          >
            <option key={0} value={0}>
              {" "}
              select Course
            </option>
            {courseNames.map((course) => (
              <option key={course.ID} value={course.ID}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        {(courseID !== 0) & (courseID !== "0") ? <Books /> : <h1> </h1>}
        <button type="submit" className="submit-button">
          submit
        </button>
      </form>
    </div>
  );
}

export default Upload;
