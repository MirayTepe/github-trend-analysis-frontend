import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import RepositoryList from '../repositoryList/RepositoryList';
import Pagination from '../pagination/Pagination';

const SearchAndList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get('/api/v1/page', {
        params: {
          page: currentPage,
          size: 10,  // Default page size
          query: searchQuery,
          filterBy: filterBy,
        }
      });
      setRepositories(response.data.repos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
    setIsLoading(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  return (
    <div className="search-and-list-container">
      <input
        type="search"
        placeholder="Search repositories"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="filter-select">
        <option value="">All</option>
        <option value="language">Language</option>
        <option value="owner">Owner</option>
        <option value="license">License</option>
        <option value="topics">Topics</option>
      </select>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <RepositoryList repositories={repositories} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchAndList;
