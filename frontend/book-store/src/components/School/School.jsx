import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function School() {
  const { school_id } = useParams();
  const api = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch school details only if school_id exists
    if (school_id) {
      const fetchSchool = async () => {
        try {
          const response = await fetch(`${api}/schools/${school_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch school data");
          }
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
        } catch (error) {
          // console.error("Error fetching school data:", error);
        }
      };
      fetchSchool();
    }
  }, [api, school_id]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "School name is required";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({ name, description }));
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }
    try {
      const url = school_id ? `${api}/schools/${school_id}` : `${api}/schools`;
      const method = school_id ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit school data");
      }
      const result = await response.json();
      // console.log(result);
      setIsSubmitted(true);
    } catch (error) {
      // console.error("Error submitting school data:", error);
    }
  };

  return (
    <div className="container-md mx-auto max-w-lg shadow-lg m-5 p-5 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        {school_id ? "Edit School" : "Create School"}
      </h1>
      {isSubmitted && (
        <p className="text-green-600 font-bold text-lg">
          Submitted successfully!
        </p>
      )}
      <form onSubmit={handleSubmit} method="POST">
        <div className="my-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="name"
          >
            School Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 "
            placeholder="School Name"
            value={name}
            onChange={handleInputChange}
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

export default School;
