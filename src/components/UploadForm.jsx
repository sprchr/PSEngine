import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadForm = ({index}) => {
  const [File, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading ,setLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const [loadingFile, setLoadingFile] = useState(true);
  const [error, setError] = useState("");
  const [deleteData,setDeleteData] = useState(false)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

   const user = localStorage.getItem('user')
   const handleUpload = async () => {
    setUploadMessage("");
    setLoading(true);
  
    // Validate if a file is selected
    if (!File) {
      setUploadMessage("Please select a file to upload.");
      setLoading(false);
      return;
    }
  
    // Validate supported file types
    const allowedTypes = [
      "application/pdf", // PDF
      "text/csv",        // CSV
      "text/plain",      // Text files
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Word (docx)
    ];
  
    if (!allowedTypes.includes(File.type)) {
      setUploadMessage("Unsupported file type. Please upload a PDF, CSV, Word,Excel or text file.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", File);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/${user.slice(1, user.length - 1).toLowerCase()}-${index}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setUploadMessage(response.data.message); // Success message from the backend
    } catch (error) {
      setUploadMessage(
        "Error uploading file: " + (error.response?.data?.message || error.message)
      );
    } finally {
      fetchFiles(); // Refresh the file list
      setLoading(false);
    }
  };


  // Fetch files on component mount
  const deleteFile = async (file) => {
    setDeleteData(true)
    try {
      // console.log(file)
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/files/${user.slice(1,user.length-1).toLowerCase()}-${index}`, {
        data: { file },
      });
      
    //  console.log(response);
     
    } catch (err) {
      setError("Error deleting file.");
    } finally{
        fetchFiles()
          setDeleteData(false)
    }
  };
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/files/${user.slice(1,user.length-1).toLowerCase()}-${index}`);
      setFiles(response.data);
    } catch (err) {
      setError("Error fetching files.");
    } finally {
      setLoadingFile(false);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    
    <div className="p-4  border-2  bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
      {loading ? "Uploading..." : ""}
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
      >
        Upload PDF
      </button>
      <p className="mt-4">{uploadMessage}</p>
 
     <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
     {loadingFile ? (
       <p>Loading files...</p>
     ) : error ? (
       <p className="text-red-500">{error}</p>
     ) : (
       <ul className="space-y-2">
          {files.length > 0 ? (
            files.map((file) => (
              <li key={file.id} className="bg-gray-100 p-2 rounded border flex justify-between items-center">
                <span>{file}</span>
                <button
                  onClick={() => deleteFile(file)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
          <p className="pl-2">
          {deleteData ? "Deleting" : ""}
          </p>
        </ul>
     )}
   </div>
  
  );
};

export default UploadForm;
