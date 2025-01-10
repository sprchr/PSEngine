import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadForm = ({index}) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading ,setLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const [loadingFile, setLoadingFile] = useState(true);
  const [error, setError] = useState("");
  const [deleteData,setDeleteData] = useState(false)
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  
  const handleUpload = async () => {
    setUploadMessage("")
    setLoading(true)

    if (!pdfFile) {
      setUploadMessage("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/${index}`, formData, 
        {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
      // console.log(response)
    } catch (error) {
      setUploadMessage("Error uploading PDF: " + error.response.data.message);
    } finally{
      // const response = await axios.get(`http://localhost:3001/files/${index}`)
    
        fetchFiles()
      
      // setFiles(response.data)
      setLoading(false)
    }
  };

  // Fetch files on component mount
  const deleteFile = async (file) => {
    setDeleteData(true)
    try {
      // console.log(file)
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/files/${index}`, {
        data: { file },
      });
      
     console.log(response);
     
    } catch (err) {
      setError("Error deleting file.");
    } finally{
        fetchFiles()
          setDeleteData(false)
    }
  };
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/files/${index}`);
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
