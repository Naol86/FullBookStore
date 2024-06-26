import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Course() {
  const api = process.env.REACT_APP_API_URL;
  const { course_id } = useParams();

  const [data, setData] = useState()
  const [schools, setSchools] = useState({ id: 0, school: [] });
  const [department, setDepartment] = useState({ id: 0, departments: [] });
  const [course, setCourse] = useState({
    name: '',
    description: '',
    code: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`${api}/categories/`)
      .then(res => res.json())
      .then(response => {
        const data = response
        setData(response)
        // Set the schools state with the top-level categories
        setSchools(data.filter(category => category.parent === null));
        // Set departments and courses (this can be optimized)
        setDepartment(data.filter(category => category.parent !== null && data.find(parent => parent.id === category.parent && parent.parent === null)));
        setCourse(data.filter(category => category.parent !== null && !data.find(parent => parent.id === category.parent && parent.parent === null)));
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [api]);


  const validate = () => {
    let errors = {};
    if (!course.name) {
      errors.course = 'Course name is required';
    }
    if (!course.code) {
      errors.code = 'Course code is required';
    }
    if (department.id === 0 || department.id === '0') {
      errors.department = 'Department is required';
    }
    if (schools.id === 0 || schools.id === '0') {
      errors.school = 'School is required';
    }
    if (!course.description) {
      errors.description = 'Course description is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0 && !course_id) {
      setErrors(newErrors);
      return;
    }
    const postData = async () => {
      const response = await fetch(
        `${api}/course/${!course_id ? department.id : course_id}`,
        {
          method: `${!course_id ? 'POST' : 'PUT'}`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(course),
        },
      );
      const data = await response.json();
    };
    postData();
    setIsSubmitted(true);
  };

  return (
    <div className='container-md mx-auto max-w-lg shadow-lg m-5 p-5 rounded-lg'>
      <h1 className='text-2xl font-bold text-gray-800 text-center'>
        Create Course
      </h1>
      {isSubmitted && (
        <p className='text-green-600 font-bold text-lg'>
          Submitted successfully!
        </p>
      )}
      <form onSubmit={handleSubmit} method='POST'>
        {!course_id && (
          <>
            <div>
              <label
                htmlFor='selectedSchool'
                className='block text-gray-700 text-lg font-bold mb-2'
              >
                Select School
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                name='selectedSchool'
                id='selectedSchool'
                value={schools.id}
                onChange={(e) =>
                  setSchools((prevSchools) => ({
                    ...prevSchools,
                    id: e.target.value,
                  }))
                }
              >
                <option value='0'>Select School</option>
                {schools.school.map((school) => (
                  <option
                    key={school.ID}
                    value={school.ID}
                    className='text-base font-medium	 dark:text-gray-900 '
                  >
                    {school.name}
                  </option>
                ))}
              </select>
              {errors.school && (
                <p className='text-red-600 font-bold text-sm'>
                  {errors.school}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='selectedDepartment'
                className='block text-gray-700 text-lg font-bold mb-2'
              >
                Select Department
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                name='selectedDepartment'
                id='selectedDepartment'
                value={department.id}
                onChange={(e) =>
                  setDepartment((preDep) => ({ ...preDep, id: e.target.value }))
                }
              >
                <option value='0'>Select Department</option>
                {department.departments.map((department) => (
                  <option
                    key={department.ID}
                    value={department.ID}
                    className='text-base font-medium	 dark:text-gray-900 '
                  >
                    {department.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className='text-red-600 font-bold text-sm'>
                  {errors.department}
                </p>
              )}
            </div>{' '}
          </>
        )}

        <div className='my-4'>
          <label
            className='block text-gray-700 text-lg font-bold mb-2'
            htmlFor='courseName'
          >
            Course Name
          </label>
          <input
            id='courseName'
            type='text'
            name='courseName'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 '
            placeholder='Course Name'
            value={course.name}
            onChange={(e) =>
              setCourse((preCourse) => ({
                ...preCourse,
                name: e.target.value,
              }))
            }
          />

          {errors.course && (
            <p className='text-red-600 font-bold text-sm'>{errors.course}</p>
          )}
        </div>

        <div className='my-4'>
          <label
            className='block text-gray-700 text-lg font-bold mb-2'
            htmlFor='courseCOde'
          >
            Course Code
          </label>
          <input
            id='courseCode'
            type='text'
            name='courseCode'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 '
            placeholder='Course Code'
            value={course.code}
            onChange={(e) =>
              setCourse((preCourse) => ({
                ...preCourse,
                code: e.target.value,
              }))
            }
          />

          {errors.code && (
            <p className='text-red-600 font-bold text-sm'>{errors.code}</p>
          )}
        </div>

        <div className='my-4'>
          <label
            className='block text-gray-700 text-lg font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <input
            id='description'
            type='text'
            name='description'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5 dark:bg-gray-100 dark:border-gray-700 dark:placeholder-gray-600 dark:text-gray-800 '
            placeholder='Description'
            value={course.description}
            onChange={(e) =>
              setCourse((preCourse) => ({
                ...preCourse,
                description: e.target.value,
              }))
            }
          />

          {errors.description && (
            <p className='text-red-600 font-bold text-sm'>
              {errors.description}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='w-full px-2 py-1 mx-0.5 text-md font-bold text-white  transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Course;
