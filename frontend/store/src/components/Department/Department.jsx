import { useState, useEffect } from "react";

function Department() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [schools, setSchools] = useState([]);
  const [description, setDescription] = useState("");
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

  function handleSchoolChange(e) {
    console.log(e);
    setId(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(id);
    console.log(description);
  };

  return (
    <div>
      here we go
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Department;
