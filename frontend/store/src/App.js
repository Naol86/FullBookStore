import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hlfpunkeyhenzvvpcipl.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZnB1bmtleWhlbnp2dnBjaXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MDI3NDcsImV4cCI6MjAzMzI3ODc0N30.K1Xy_9mmuJR4fy00mk7W9pQp-fe_AKM46e6m31kLnJ4";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected.");
      return;
    }

    const fileName = file.name;
    const bucketName = "school-of-elec/software/information-retrival";

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);
      console.log(data, "this is data", bucketName, fileName);

      if (error) {
        setMessage(`Error uploading file: ${error.message}`);
        return;
      }

      const { signedURL, signedURLError } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(`${bucketName}/${fileName}`, 60 * 60 * 24 * 365);

      if (signedURLError) {
        setMessage(`Error creating signed URL: ${signedURLError.message}`);
        return;
      }

      setMessage(`File uploaded successfully!`);
      setFileUrl(signedURL);
      console.log(signedURL);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Supabase File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
      {fileUrl && (
        <p>
          Access the file{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      )}
    </div>
  );
}

export default App;
