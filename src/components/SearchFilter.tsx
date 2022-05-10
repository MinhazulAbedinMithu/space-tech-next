import React from "react";

const SearchFilter = ({
  setSearchText,
  filters,
  setFilters,
  renderedItems,
}: any) => {
  return (
    <div className="container pb-3 pt-1 text-center">
      <div className="row g-3">
        <h4 className="mt-3">Search and Select Filtering...</h4>
        <div className="col-md-3 col-12">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Rocket Name"
            className="form-control py-2 fs-5"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-9 col-12 d-flex flex-column flex-md-row">
          <select
            className="form-select form-select-lg"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, launchDate: e.target.value })
            }
          >
            <option selected>Launch Date</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
            <option value="last-5-year">Last 5 Year</option>
          </select>
          <select
            className="form-select form-select-lg mx-md-3 my-2 my-md-0"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, launchStatus: e.target.value })
            }
          >
            <option selected>Launch Status</option>
            <option value="true">Success</option>
            <option value="false">Failure</option>
          </select>
          <select
            className="form-select form-select-lg"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, isUpcoming: e.target.value })
            }
          >
            <option selected>Is Upcoming</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <h5>
          Total Rendered Items:{" "}
          <span
            className={`px-3 py-2 rounded-pill fs-3 ${
              renderedItems.length > 0
                ? "bg-info text-light"
                : "bg-danger text-warning"
            }`}
          >
            {renderedItems.length}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default SearchFilter;
