import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function Upload() {
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        return;
      }

      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from(bucketName)
          .createSignedUrl(formData.file.name, 60 * 60 * 24 * 365);

      if (signedUrlError) {
        setMessage(`Error creating signed URL: ${signedUrlError.message}`);
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
  };

  return (
    <div className="department-container">
      <h1>Upload Book</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectedSchool">School</label>
          <select
            name="selectedSchool"
            id="selectedSchool"
            value={formData.selectedSchool}
            onChange={handleChange}
          >
            <option value="0">Select School</option>
            {formData.schools.map((school) => (
              <option key={school.ID} value={school.ID}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="selectedDepartment">Department</label>
          <select
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
        </div>
        <div className="form-group">
          <label htmlFor="selectedCourse">Course</label>
          <select
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
        </div>
        {formData.selectedCourse !== "0" && (
          <div>
            <div className="form-group">
              <label htmlFor="file">Select File</label>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-button">
              Upload
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Upload;
