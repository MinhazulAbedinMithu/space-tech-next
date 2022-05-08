import React from "react";

interface ISearchBar {
  value: string;
  changeInput: any;
}
const SearchBar = ({ value, changeInput }: ISearchBar) => {
  console.log(value, changeInput);
  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by Rocket Name"
        className="form-control"
        value={value}
        onChange={changeInput}
      />
    </div>
  );
};

export default SearchBar;
