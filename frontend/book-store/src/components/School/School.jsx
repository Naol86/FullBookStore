import { useState } from "react";

function School() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const api = process.env.REACT_APP_API_URL;
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInputChange(e) {
    setName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, api, JSON.stringify({ name, description }));
    try {
      const response = await fetch(`${api}/schools`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="department-container">
      <h1>School Form</h1>
      {isSubmitted && (
        <p className="success-message">Submitted successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="school--name">School Name:</label>
          <input
            type="text"
            id="school--name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="school--name">description:</label>
          <input
            type="text"
            id="des"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default School;
