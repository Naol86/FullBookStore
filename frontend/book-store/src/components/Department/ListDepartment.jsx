import { useEffect, useState } from "react";

function ListDepartment() {
  const [department, setDepartment] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`${api}/department`);
      const data = await response.json();
      setDepartment(data);
    };
    fetchDepartment();
  }, [api]);

  const handleDelete = (e) => {
    const deparmentId = e.target.value;
    const deleteCourse = async () => {
      const response = await fetch(`${api}/department/${deparmentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newDepartment = department.filter(
          (dep) => (dep.ID !== deparmentId) & (dep.ID !== Number(deparmentId))
        );
        setDepartment(newDepartment);
      }
    };
    deleteCourse();
  };

  return (
    <>
      <div className="p-3 m-2 max-w-lg mx-auto border-gray-100	border-solid	border-2 rounded-lg	shadow-xl	">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-900 text-center">
          Department
        </h1>
        {department.map((dep) => (
          <div
            className="max-w-full p-6 bg-white border rounded-lg dark:bg-gray-100 my-4 shadow-lg"
            key={dep.ID}
          >
            <img
              src="https://www.svgrepo.com/show/474803/department.svg"
              alt="dep"
              className="flex h-6 me-3 sm:h-7"
            />

            <h5
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-800"
              value={dep.ID}
            >
              {dep.name}
            </h5>

            <p className="mb-3 font-normal text-gray-600 dark:text-gray-600">
              {dep.description}
            </p>
            <div className="flex justify-end">
              <button className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                Edit
              </button>
              <button
                className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                onClick={handleDelete}
                value={dep.ID}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListDepartment;
