import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import ShowSchool from "../School/ShowSchool";
import Team from "../Team/Team";
import ShowBook from "../Books/ShowBook";
import BookCard from "../Books/BookCard";
import ListBooks from "../Books/ListBooks";

function UserLayout({ children }) {
  const [school, setSchool] = useState([]);
  const [book, setBook] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSchool = async () => {
      const response = await fetch(`${api}/schools`);
      const data = await response.json();
      setSchool(data);
    };
    fetchSchool();
  }, [api]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${api}/books`);
      const data = await response.json();
      setBook(data);
    };
    fetchBooks();
  }, [api]);

  return (
    <div>
      <NavBar />
      {/* <div className="justify-around">
        {school.map((school) => (
          <ShowSchool key={school.ID} school={school} />
        ))}
      </div> */}
      <ShowSchool school={school[0]} />
      <div className="flex flex-wrap w-full space-x-1 p-5 justify-center">
        {book.map((bo, index) => (
          <div key={index} className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="h-full">
              <ShowBook book={bo} />
            </div>
          </div>
        ))}
      </div>
      <Team />
      <div className="mt-4">
        {Array.from({ length: 100 }).map((_, i) => (
          <h1 key={i}>hello</h1>
        ))}
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
