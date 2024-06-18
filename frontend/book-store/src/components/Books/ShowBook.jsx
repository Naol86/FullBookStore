import React from "react";

function ShowBook({ book }) {
  if (!book) return null;
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-200">
      <div
        className="flex-shrink-0 h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${book.image})`,
        }}
      ></div>

      <div className="flex flex-col justify-between flex-grow p-2 sm:p-3 md:p-4">
        <div>
          <h1
            className="text-xl font-bold text-gray-800 dark:text-gray-900"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {book.name}
          </h1>
          <p
            className="mt-2 text-md text-gray-700 dark:text-gray-800"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {book.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <h1
            className="text-md font-bold text-gray-800 dark:text-gray-600 md:text-md truncate"
            style={{
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {book.author}
          </h1>

          <button className="px-1 py-1 mx-0 md:mx-1 text-xs font-bold text-white uppercase transition-all duration-500 transform bg-gray-900 rounded dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
            <a
              href={book.file}
              download={`${book.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowBook;
