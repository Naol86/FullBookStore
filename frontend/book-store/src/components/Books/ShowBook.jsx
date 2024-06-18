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

      <div className="flex flex-col justify-between flex-grow p-4 md:p-4">
        <div>
          <h1
            className="text-xl font-bold text-gray-800 dark:text-gray-900"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
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
              WebkitLineClamp: 4,
              overflow: "hidden",
            }}
          >
            {book.description}
          </p>
        </div>

        <div className="flex justify-between mt-3 items-center">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-600 md:text-xl">
            {book.author}
          </h1>
          <div className="">
            <button className="px-2 py-1 mx-1 text-xs font-bold text-white uppercase transition-all duration-500 transform bg-gray-900 rounded dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
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
    </div>
  );
}

export default ShowBook;
