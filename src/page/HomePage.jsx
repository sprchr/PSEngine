import React from "react";
import { useNavigate } from "react-router-dom";
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";

const HomePage = () => {
  const navigate = useNavigate();
 const googleProvider = new GoogleAuthProvider();
 const handleGoogleLogin = async () => {
  try {
    const user  = auth.currentUser
    if(!user){
      await signInWithPopup(auth, googleProvider);
    }
    navigate("/dashboard");
  } catch (error) {
    console.error("Google login failed", error.message);
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">RAG Model Application</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
        Welcome to the RAG (Retrieval-Augmented Generation) Model Application! This tool helps you 
        efficiently search and retrieve insights from uploaded documents using advanced AI-driven 
        technologies. Whether it's research papers, reports, or other documents, our app simplifies 
        the search process to save your time and enhance productivity.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-3/4 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Search through uploaded documents quickly and efficiently.</li>
          <li>Leverage AI-driven algorithms for accurate retrieval of relevant data.</li>
          <li>Securely manage and store your documents with Firebase integration.</li>
          <li>Easy-to-use interface for seamless navigation and interaction.</li>
          <li>Access your dashboard to analyze and manage retrieved information.</li>
        </ul>
      </div>
     
      <button
        onClick={() =>handleGoogleLogin()}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Try It
      </button>
      <footer className="text-gray-600 text-sm mt-8">
        © 2025 RAG Model Application. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
