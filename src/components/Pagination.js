import React from 'react';
import './css/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleFirstPage = () => onPageChange(1);
  const handlePreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));
  const handleLastPage = () => onPageChange(totalPages);

  const handlePageClick = (page) => () => onPageChange(page);

  const getPaginationButtons = () => {
    const maxVisiblePages = 10;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      pages.push(
        <button
          key={pageNum}
          onClick={handlePageClick(pageNum)}
          className={pageNum === currentPage ? 'active' : ''}
        >
          {pageNum}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={handleFirstPage} disabled={currentPage === 1}>&laquo;</button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
      {getPaginationButtons()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
      <button onClick={handleLastPage} disabled={currentPage === totalPages}>&raquo;</button>
    </div>
  );
};

export default Pagination;
