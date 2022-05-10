import React from "react";

const PaginationController = ({ setItemsInPage }: any) => {
  return (
    <div>
      <span>How many items in a page: </span>
      <select
        className="p-md-2 fs-md-5"
        aria-label=".form-select-lg"
        onChange={(e) => setItemsInPage(Number(e.target.value))}
      >
        <option value="4">4</option>
        <option value="8" selected>
          8
        </option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
    </div>
  );
};

export default PaginationController;
