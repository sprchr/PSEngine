import React from "react";

import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchPage from "./page/SearchPage";
import Dashboard from "./page/Dashbord";


const App = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search/:indexNumber" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
    /*       
      <div className=" gap-10 flex h-full">
        <div className="flex flex-col">
        <UploadForm />
        </div>
        <SearchForm />
      </div> */

    // </div>
  );
};

export default App;
