function BookCard({ book, handleDelete }) {
  return (
    <div className="flex overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-100 w-full my-4">
      <div
        className="w-1/3 bg-cover"
        style={{
          backgroundImage: `url(${book.image})`,
        }}
      ></div>

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-900">
          {book.name}
        </h1>

        <p className="mt-2 text-md text-gray-700 dark:text-gray-800">
          {book.description}
        </p>

        <div className="flex mt-2 item-center"></div>

        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-600 md:text-xl">
            {book.author}
          </h1>
          <div className="">
            <button className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
              Edit
            </button>
            <button
              className="px-2 py-1 mx-0.5 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
              onClick={handleDelete}
              value={book.ID}
            >
              Delete
            </button>
            <button className="px-2 py-1 mx-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
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

export default BookCard;
