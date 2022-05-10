import React from "react";

const Loading = () => {
  return (
    <div className="gx-2 d-flex align-items-center justify-content-center">
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning mx-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
