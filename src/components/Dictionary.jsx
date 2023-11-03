import { useState } from "react";
import { search } from "../assets";

const Dictionary = () => {
    const [input, setInput] = useState('');
    const [dict, setDict] = useState('');

    const fetchAPI = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setDict(data[0].meanings[0].definitions[0].definition);
        } catch (error) {
            console.error("An error occurred:", error);
            setDict("Definition not found.");
        }
    };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl my-10 font-bold text-center text-gradient bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Welcome to CJ Dictionary!
        </h1>        
        <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-md flex items-center shadow-md">
            <input
            type="text"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:border-blue-500"
            placeholder="Enter a word..."
            onChange={(e) => { setInput(e.target.value) }}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md" onClick={() => { fetchAPI(input) }}>
            <img src={search} alt="search" className="w-6 h-6" />
            </button>
        </div>
        <p className="mt-16 text-center text-xl">{dict}</p>
    </div>
  );
}

export default Dictionary;
