import { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

function Department() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schools, setSchools] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${api}/schools`);
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [api]);

  const handleSchoolChange = (e) => {
    setId(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Department name is required";
    if (!id || id === "0") newErrors.school = "Please select a school";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false); // Reset the submission status if there are errors
    } else {
      // Clear the form or make the API call here
      console.log("Name:", name);
      console.log("School ID:", id);
      console.log("Description:", description);
      const response = await fetch(`${api}/department/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      console.log(response);
      setErrors({});
      setIsSubmitted(true); // Set submission status to true
    }
  };

  return (
    <div className="department-container">
      <h1>Department Form</h1>
      {isSubmitted && (
        <p className="success-message">Submitted successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="school">School</label>
          <select
            name="school"
            id="school--id"
            onChange={handleSchoolChange}
            value={id}
          >
            <option value="0">Select a school</option>
            {schools.map((school) => (
              <option key={school.ID} value={school.ID}>
                {school.name}
              </option>
            ))}
          </select>
          {errors.school && <p className="error-message">{errors.school}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="department">Department Name</label>
          <input
            type="text"
            id="department"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Department;
