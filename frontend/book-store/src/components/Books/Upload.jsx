import React, { useEffect, useState } from "react";
import SUPABASE from "../supabase";
import HashLoader from "react-spinners/HashLoader";

function Upload() {
  const supabase = SUPABASE;
  const [formData, setFormData] = useState({
    schools: [],
    departments: [],
    courses: [],
    selectedSchool: "0",
    selectedDepartment: "0",
    selectedCourse: "0",
    file: null,
    description: "",
    author: "",
  });
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${api}/schools`);
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, schools: data }));
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, [api]);

  useEffect(() => {
    if (formData.selectedSchool !== "0") {
      const fetchDepartments = async () => {
        try {
          const response = await fetch(
            `${api}/department/${formData.selectedSchool}`
          );
          const data = await response.json();
          setFormData((prevData) => ({ ...prevData, departments: data }));
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
      fetchDepartments();
    }
  }, [formData.selectedSchool, api]);

  useEffect(() => {
    if (formData.selectedDepartment !== "0") {
      const fetchCourses = async () => {
        try {
          const response = await fetch(
            `${api}/course/${formData.selectedDepartment}`
          );
          const data = await response.json();
          setFormData((prevData) => ({ ...prevData, courses: data }));
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    }
  }, [formData.selectedDepartment, api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = (e) => {
    const newErrors = {};
    const description = e.target.description.value;
    const author = e.target.author.value;
    if (formData.selectedSchool === "0") {
      newErrors.school = "Please select a school";
    }
    if (formData.selectedDepartment === "0") {
      newErrors.department = "Please select a department";
    }
    if (formData.selectedCourse === "0") {
      newErrors.course = "Please select a course";
    }
    if (!formData.file) {
      newErrors.file = "Please select a file";
    }
    if (!description) {
      newErrors.description = "Please enter a description";
    }
    if (!author) {
      newErrors.author = "Please enter an author";
    }
    return newErrors;
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const newErrors = validate(e);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const bucketName = "booksrote";

      const selectedSchool = formData.schools.find(
        (school) => school.ID === parseInt(formData.selectedSchool)
      );
      const selectedDepartment = formData.departments.find(
        (dep) => dep.ID === parseInt(formData.selectedDepartment)
      );
      const selectedCourse = formData.courses.find(
        (course) => course.ID === parseInt(formData.selectedCourse)
      );

      if (
        !selectedSchool ||
        !selectedDepartment ||
        !selectedCourse ||
        !formData.file
      ) {
        setMessage("Please fill out all fields and select a file.");
        return;
      }

      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(formData.file.name, formData.file);

        if (error) {
          setMessage(`Error uploading file: ${error.message}`);
          setLoading(false);
          return;
        }

        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from(bucketName)
            .createSignedUrl(formData.file.name, 60 * 60 * 24 * 365);

        if (signedUrlError) {
          setMessage(`Error creating signed URL: ${signedUrlError.message}`);
          setLoading(false);
          return;
        }

        setFileUrl(signedUrlData.signedUrl);

        const postData = async () => {
          const response = await fetch(
            `${api}/books/${formData.selectedCourse}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formData.file.name,
                description: formData.description,
                file: signedUrlData.signedUrl,
                author: formData.author,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to submit book data.");
          }

          const data = await response.json();
          setMessage("File uploaded successfully!");
          console.log(data);
        };
        postData();
      } catch (error) {
        setMessage(`Error uploading file: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            loading ? "bg-gray-100 bg-opacity-50" : ""
          }`}
        >
          <div>
            <HashLoader color="#101716" loading={loading} size={100} />
            <h1 className="text-2xl font-bold text-gray-800">uploading...</h1>
          </div>
        </div>
      )}
      <div
        className={`container-md mx-auto max-w-lg shadow-lg m-5 p-5 rounded-lg ${
          loading ? "blur-md" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Upload Book
        </h1>
        {message && (
          <p className="text-green-600 font-bold text-lg">{message}</p>
        )}
        <form onSubmit={handleSubmit} method="POST">
          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="countries"
            >
              Select a School
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="selectedSchool"
              id="selectedSchool"
              value={formData.selectedSchool}
              onChange={handleChange}
            >
              <option value="0">Select School</option>
              {formData.schools.map((school) => (
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
              <p className="text-red-600 font-bold text-lg">{errors.school}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="countries"
            >
              Select a Department
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="selectedDepartment"
              id="selectedDepartment"
              value={formData.selectedDepartment}
              onChange={handleChange}
            >
              <option value="0">Select Department</option>
              {formData.departments.map((department) => (
                <option key={department.ID} value={department.ID}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-600 font-bold text-lg">
                {errors.department}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="countries"
            >
              Select a Course
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="selectedCourse"
              id="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleChange}
            >
              <option value="0">Select Course</option>
              {formData.courses.map((course) => (
                <option key={course.ID} value={course.ID}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-600 font-bold text-lg">{errors.course}</p>
            )}
          </div>

          <div>
            <div className="">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="file"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            {errors.file && (
              <p className="text-red-600 font-bold text-lg">{errors.file}</p>
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
              type="text"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 "
              placeholder="description"
              onChange={handleChange}
            />

            {errors.description && (
              <p className="text-red-600 font-bold text-lg">
                {errors.description}
              </p>
            )}
          </div>

          <div className="my-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>

            <input
              type="text"
              name="author"
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 "
              placeholder="author"
              value={formData.author}
              onChange={handleChange}
            />
            {errors.author && (
              <p className="text-red-600 font-bold text-lg">{errors.author}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-2 py-1 mx-0.5 text-md font-bold text-white  transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;
