import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
export const Pagination = ({
  itemsPerPage,
  itemsLength,
  itemOffset,
  setItemOffset,
}) => {
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(itemsLength / itemsPerPage));
    console.log(Math.ceil(itemsLength / itemsPerPage));
  },[itemsLength]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event.selected);
    const newOffset = (event.selected * itemsPerPage) % itemsLength;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="pagination">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
