import { useEffect, useState } from "react";
import "./style.css";

function ListBooks() {
  const [books, setBooks] = useState([]);
  const api = process.env.REACT_APP_API_URL;

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
    const deleteBook = async () => {
      const response = await fetch(`${api}/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newBooks = books.filter(
          (book) => (book.ID !== bookId) & (book.ID !== Number(bookId))
        );
        setBooks(newBooks);
        console.log(books);
      }
    };
    deleteBook();
  };

  return (
    <div className="department-container">
      <h1>Books</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.ID} className="book-item">
            <div className="book-view">
              <div className="book-logo">
                <img src={book.image} alt={book.name} />
              </div>
              <div className="book-info">
                <h2>{book.name}</h2>
                <p>{book.description}</p>
                <p>{book.author}</p>
                <button className="download-btn">
                  <a
                    href={book.file}
                    download={`${book.name}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    download
                  </a>
                </button>
              </div>
              <div>
                <button value={book.ID}>edit</button>
                <button value={book.ID} onClick={handleDelete}>
                  delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListBooks;
