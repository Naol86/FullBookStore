import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
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
    const bucketName = "books";

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);
      console.log(data);

      if (error) {
        setMessage(`Error uploading file: ${error.message}`);
        return;
      }

      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from(bucketName)
          .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError) {
        setMessage(`Error creating signed URL: ${signedUrlError.message}`);
        return;
      }

      setMessage(`File uploaded successfully!`);
      setFileUrl(signedUrlData.signedUrl);
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
