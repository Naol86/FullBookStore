import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Course, Department, NotFound, School, Upload } from "./components";
import ListBooks from "./components/Books/ListBooks";
import ListCourse from "./components/Course/ListCourse";
import ListSchool from "./components/School/ListSchool";
import ListDepartment from "./components/Department/ListDepartment";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create-books" element={<Upload />} />
        <Route path="/create-school" element={<School />} />
        <Route path="/create-department" element={<Department />} />
        <Route path="/create-course" element={<Course />} />

        <Route path="/books" element={<ListBooks />} />
        <Route path="/course" element={<ListCourse />} />
        <Route path="/school" element={<ListSchool />} />
        <Route path="/department" element={<ListDepartment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
