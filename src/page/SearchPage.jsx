import React from 'react'
import UploadForm from '../components/UploadForm'
import SearchForm from '../components/SearchForm'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const navigate = useNavigate()
    const { indexNumber } = useParams();
  return (
    <div className="m-10 mt-2">
    <button  onClick={() =>navigate('/dashboard')}  
    className='border-2 bg-gray-700 cursor-pointer hover:scale-105 text-white px-2 py-1 rounded-md text-center flex  ml-auto'>Go to Dashboard</button>
    <div on className='flex gap-5 h-screen  pt-2'>
        <UploadForm index={indexNumber} />
        <SearchForm index={indexNumber}/>
    </div>
    </div>
  )
}

export default SearchPage
