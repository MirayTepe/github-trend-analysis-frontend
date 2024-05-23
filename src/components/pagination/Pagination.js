import React from 'react';
import style from './Pagination.css'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        Önceki
      </button>
      <span>Page {currentPage + 1} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;
