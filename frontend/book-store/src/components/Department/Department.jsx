import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Department() {
  const { department_id } = useParams();
  const [department, setDepartment] = useState({
    id: 0,
    name: "",
    description: "",
  });

  const [schools, setSchools] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (department_id) {
      const fetchDepartment = async () => {
        const response = await fetch(`${api}/department/${department_id}`);
        const data = await response.json();
        setDepartment({ ...data, id: department_id });
      };
      fetchDepartment();
    } else {
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
    }
  }, [api, department_id]);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!department.name) newErrors.name = "Department name is required";
    if (!department_id) {
      if (!department.id || department.id === "0")
        newErrors.school = "Please select a school";
    }
    if (!department.description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false); // Reset the submission status if there are errors
    } else {
      const dataSend = {
        name: department.name,
        description: department.description,
      };

      const response = await fetch(`${api}/department/${department.id}`, {
        method: `${department_id ? "PUT" : "POST"}`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
      setDepartment({ id: 0, name: "", description: "" });
      setErrors({});
      setIsSubmitted(true); // Set submission status to true
    }
  };

  return (
    <div className="container-md mx-auto max-w-lg shadow-lg m-5 p-5 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Create Department
      </h1>
      {isSubmitted && (
        <p className="text-green-600 font-bold text-lg">
          Submitted successfully!
        </p>
      )}
      <form onSubmit={handleSubmit} method="POST">
        {!department_id && (
          <div>
            <label
              htmlFor="selectedSchool"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Select a School
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="id"
              id="selectedSchool"
              value={department.id}
              onChange={handleChange}
            >
              <option value="0">Select School</option>
              {schools.map((school) => (
                <option
                  key={school.ID}
                  value={school.ID}
                  className="text-base font-medium	 dark:text-gray-900 "
                >
                  {school.name}
                </option>
              ))}
            </select>
            {errors.school && (
              <p className="text-red-600 font-bold text-md">{errors.school}</p>
            )}
          </div>
        )}

        <div className="my-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="name"
          >
            Department Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 "
            placeholder="School Name"
            value={department.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="text-red-600 font-bold text-lg">{errors.name}</p>
          )}
        </div>

        <div className="my-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 "
            placeholder="Description"
            value={department.description}
            onChange={handleChange}
          />

          {errors.description && (
            <p className="text-red-600 font-bold text-lg">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-2 py-1 mx-0.5 text-md font-bold text-white  transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Department;
