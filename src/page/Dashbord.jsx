import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";

const Dashboard = () => {
  const [index, setIndex] = useState(null);
  const [indexName, setIndexName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInput, setInputError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalLoading,setModalLoading] =useState(false)
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleClick = (indexNumber) => {
    // Navigate to the dynamic route
    navigate(`/search/${indexNumber}`);
  };


  const getIndex = async () => {
    try {
      setLoading(true); // Start the loading state
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/index`,
        {
          params: {
            name: user, // Pass the 'user' value as a query parameter
          },
        }
      );
      const result = response.data.map((item) => item.slice(user.length - 1));
      // console.log(result);
      setIndex(result); // Update the index state with the fetched data
    } catch (error) {
      console.error("Error fetching index data:", error);
      setError("Failed to fetch index data.");
    } finally {
      setLoading(false); // End the loading state
    }
  };
  const deleteIndex = async (index) => {
    try {
      setLoading(true); // Start the loading state
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/index/${user
          .slice(1, user.length - 1)
          .toLowerCase()}-${index}`
      );
      
      console.log("Index deleted successfully:", response.data);
     // Refresh the list of indexes after deletion
    } catch (error) {
      console.error("Error deleting index:", error);
      setError("Failed to delete index.");
    } finally {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/index`,
        {
          params: {
            name: user, // Pass the 'user' value as a query parameter
          },
        }
      );
      const result = response.data.map((item) => item.slice(user.length - 1));
      // console.log("after deleting:",result);
      
      if(result.length > 0) {
        if (result.some((f) => f === index)) {
          const updatedFiles = result.filter((f) => f !== index);
          setIndex(updatedFiles);
        } 
      }
      else {
        setIndex(response.data)
      }
    
      setLoading(false); // End the loading state
    }
  };
  const createIndex = async (e) => {
    setModalLoading(true)
    e.preventDefault();
    setInputError("");
    setError("");
  
    try {
      // Final sanitization of indexName before submission
      const sanitizedValue = indexName.replace(/[^a-z0-9-]/g, "");
      setIndexName(sanitizedValue);
  
      // Validate input
      if (indexName !== sanitizedValue || sanitizedValue === "") {
        setInputError("Only lowercase letters, numbers, and hyphens are allowed.");
        return;
      }
  
      setLoading(true); // Show a loading state
  
      // Create a FormData object and append the sanitized indexName
      const formData = new FormData();
      formData.append("indexName", sanitizedValue); // Match expected backend field name
  
      // Send the POST request with formData
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/index/${user
          .slice(1, user.length - 1)
          .toLowerCase()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Refresh the index list
      await getIndex();
      console.log("Index created successfully:", response.data);
      setLoading(false); 
      setIsModalOpen(false); 
      setModalLoading(false)
      setIndexName("")
    } catch (error) {
      console.error("Error creating index:", error);
      setError("Failed to create index,Please reload the page");
      
    } 
    finally{
      setIsModalOpen(false); 
      setModalLoading(false)
      setLoading(false); 
    }
  };

  useEffect(() => {
    getIndex();
  }, []);
  return (
    <div className="pt-24 bg-gray-200 h-screen">
      <div className="pt-24 bg-gray-200">
        <p className="text-center text-3xl font-medium">
          Build AI-Driven Search Engine
        </p>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : index && index.length > 0 ? (
          <div className="">
            <div className="grid grid-cols-4 mt-8 mx-10 gap-5">
              {index.map((indexNumber, i) => (
                <div
                  key={i}
                  className="hover:scale-110 text-xl cursor-pointer text-center font-medium border-2 border-black shadow-xl py-5"
                >
                  <div className="flex  justify-between px-10">
                    <p className="underline text-sm mb-5">Search Page - {i}</p>
                    <p
                      className="text-sm hover:text-red-500"
                      onClick={() => deleteIndex(indexNumber)}
                    >
                      Delete
                    </p>
                  </div>
                  <p onClick={() => handleClick(indexNumber)}>
                    {indexNumber.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg font-medium">
              Click on Search pages to navigate to your Search engine <br/>
              <b>Maximum allowed engines are 5</b>
            </p>
            <div className="App">
              {/* Button to open modal */}
              <button
                className="mx-auto flex mt-8 border-2 p-2 font-medium border-black"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Generate Search Engine
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-16 p-5 ">
            <p className="text-center font-bold">
              You don't have any search engines Click below to generate <br/>
               <b>Maximum Search engines allowed 5</b>
            </p>
            <div className="App">
              {/* Button to open modal */}
              <button
                className="mx-auto flex mt-8 border-2 p-2 font-medium border-black"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Generate Search Engine
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Index Name</h2>
            <form onSubmit={createIndex}>
              <div className="">
              <input
  type="text"
  placeholder="Index Name"
  className={`w-full border p-2 rounded-md mb-1 ${
    errorInput ? "border-red-500" : "border-gray-300"
  }`}
  value={indexName}
  onChange={(e) => { 
    setIndexName(e.target.value)
  }}
  required
/>
{errorInput && <p className="text-red-500 text-sm">{errorInput}</p>}
    </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  
                  disabled={modalLoading}
                >
                 {modalLoading ? "Creating..." : "Create Index"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
