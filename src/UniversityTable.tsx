import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const UniversityTable = () => {
  const [universities, setUniversities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [row, setRow] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://universities.hipolabs.com/search?country=United+States');
      const data = await response.json();
      setUniversities(data);
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastUniversity = currentPage * itemsPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - itemsPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(universities.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Universities in the United States</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">S/No</th>
            <th className="border border-gray-300 p-2">Country</th>
            <th className="border border-gray-300 p-2">University Name</th>
            <th className="border border-gray-300 p-2">Website</th>
          </tr>
        </thead>
        <tbody>
          {currentUniversities.map((uni, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{index + 1}</td>
               <td className="border border-gray-300 p-2">{uni.country}</td>
              <td className="border border-gray-300 p-2">{uni.name}</td>
              <td className="border border-gray-300 p-2">
                <a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default UniversityTable;
