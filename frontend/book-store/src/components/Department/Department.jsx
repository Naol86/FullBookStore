import { useState, useEffect } from "react";

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
        <div>
          <label
            htmlFor="selectedSchool"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Select a School
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="selectedSchool"
            id="selectedSchool"
            value={id}
            onChange={handleSchoolChange}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
