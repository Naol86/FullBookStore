import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import {
  Course,
  Department,
  NotFound,
  RootLayout,
  School,
  Upload,
} from "./components";
import ListBooks from "./components/Books/ListBooks";
import ListCourse from "./components/Course/ListCourse";
import ListSchool from "./components/School/ListSchool";
import ListDepartment from "./components/Department/ListDepartment";
import "./App.css";
import UserLayout from "./components/UserLayout/UserLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/admin/create-books"
          element={<RootLayout children={<Upload />} />}
        />
        <Route
          path="/admin/create-school/:school_id?"
          element={<RootLayout children={<School />} />}
        />
        <Route
          path="/admin/create-department/:department_id?"
          element={<RootLayout children={<Department />} />}
        />
        <Route
          path="/admin/create-course/:course_id?"
          element={<RootLayout children={<Course />} />}
        />

        <Route
          path="/admin"
          element={<RootLayout children={<ListBooks />} />}
        />

        <Route
          path="/admin/books"
          element={<RootLayout children={<ListBooks />} />}
        />
        <Route
          path="/admin/course"
          element={<RootLayout children={<ListCourse />} />}
        />
        <Route
          path="/admin/school"
          element={<RootLayout children={<ListSchool />} />}
        />
        <Route
          path="/admin/department"
          element={<RootLayout children={<ListDepartment />} />}
        />

        <Route path="/" element={<UserLayout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
