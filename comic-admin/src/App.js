import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('releaseDate', releaseDate);
    formData.append('coverImage', file);

    try {
      // Make the POST request to upload the comic
      const response = await axios.post('http://localhost:5000/api/comics/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Comic uploaded successfully!');
    } catch (error) {
      console.error('Error uploading comic:', error);
      setMessage('Failed to upload comic.');
    }
  };

  return (
    <div className="App">
      <h1>Upload a New Comic</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Upload Comic</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
