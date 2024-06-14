import { useEffect, useState } from "react";
import SUPABASE from "../supabase";
import BookCard from "./BookCard";

function ListBooks() {
  const [books, setBooks] = useState([]);
  const api = process.env.REACT_APP_API_URL;

  const supabase = SUPABASE;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${api}/books`);
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, [api]);

  const handleDelete = (e) => {
    const bookId = e.target.value;
    const fileName = books.filter((book) => book.ID === Number(bookId))[0].name;
    const deleteBook = async () => {
      const response = await fetch(`${api}/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newBooks = books.filter(
          (book) => (book.ID !== bookId) & (book.ID !== Number(bookId))
        );
        setBooks(newBooks);

        const { data, error } = await supabase.storage
          .from("booksrote")
          .remove([`${fileName}`]);
      }
    };
    deleteBook();
  };

  return (
    <div className="container-md  p-3 m-2 max-w-lg mx-auto border-gray-100	border-solid	border-2 rounded-lg	shadow-xl	">
      <h1 className="mt-3 text-2xl font-bold text-gray-800 text-center">
        Books
      </h1>
      {books.map((book) => (
        <BookCard book={book} handleDelete={handleDelete} key={book.ID} />
      ))}
      <div className="flex justify-center	my-3">
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 mx-1 py-1 text-l font-semibold text-gray-900 ring-2 ring-inset ring-gray-700/10">
          Previous
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 mx-1 py-1 text-l font-semibold text-gray-900 ring-2 ring-inset ring-gray-700/10">
          Next
        </span>
      </div>
    </div>
  );
}

export default ListBooks;
