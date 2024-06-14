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

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/create-books"
          element={<RootLayout children={<Upload />} />}
        />
        <Route
          path="/create-school"
          element={<RootLayout children={<School />} />}
        />
        <Route
          path="/create-department"
          element={<RootLayout children={<Department />} />}
        />
        <Route
          path="/create-course"
          element={<RootLayout children={<Course />} />}
        />

        <Route
          path="/books"
          element={<RootLayout children={<ListBooks />} />}
        />
        <Route
          path="/course"
          element={<RootLayout children={<ListCourse />} />}
        />
        <Route
          path="/school"
          element={<RootLayout children={<ListSchool />} />}
        />
        <Route
          path="/department"
          element={<RootLayout children={<ListDepartment />} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
