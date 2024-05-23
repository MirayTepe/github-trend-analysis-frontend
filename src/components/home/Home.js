import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import RepositoryList from '../repositoryList/RepositoryList';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Pagination from '../pagination/Pagination';
import styles from './Home.css';

const Home = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get('/api/repo/page', {
        params: {
          page: currentPage,
          size: 10,  // Default page size
        }
      });
      setRepositories(response.data.repos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilterBy(filterValue);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery || filterBy) {
      handleSearch();
    }
  }, [searchQuery, filterBy]);

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search repositories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="../../../images/search.png" alt="Search icon" />
        </button>
        <select value={filterBy} onChange={handleFilterChange} className="filter-select">
          <option value="">All</option>
          <option value="language">Language</option>
          <option value="owner">Owner</option>
          <option value="license">License</option>
          <option value="topics">Topics</option>
        </select>
      </div>
      {auth?.user ? (
        <>
          <RepositoryList repositories={repositories} isLoading={isLoading} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>Please log in to view repositories.</p>
      )}
    
    </div>
  );
};

export default Home;
