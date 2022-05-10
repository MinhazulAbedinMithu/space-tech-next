import React from "react";
import { Pagination } from "react-bootstrap";

const PagePagination = ({
  handleFirst,
  handlePrev,
  handleNext,
  handleLast,
  totalPages,
  currentPage,
}: any) => {
  return (
    <Pagination className="fs-md-5 pt-3">
      <Pagination.First onClick={handleFirst}>1</Pagination.First>
      <Pagination.Prev onClick={handlePrev}>Prev</Pagination.Prev>
      <Pagination.Item active>{currentPage}</Pagination.Item>
      <Pagination.Next onClick={handleNext}>Next</Pagination.Next>
      <Pagination.Last onClick={handleLast}>{totalPages}</Pagination.Last>
    </Pagination>
  );
};

export default PagePagination;
