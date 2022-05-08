import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchLaunches } from "./features/launch/launchSlice";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const launch = useAppSelector((state) => state.launch);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);
  const { launches, loading, error } = launch;

  //Search Functionalities:
  const searchItems = launches.filter((item) =>
    item.rocket.rocket_name.toLowerCase().includes(searchText)
  );

  const renderedItems = searchText ? searchItems : launches;

  return (
    <div className="container">
      <header className="pb-5 pt-2">
        <h1>Space TechNext</h1>
        <div className="col-md-6">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Rocket Name"
            className="form-control"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </header>
      {loading ? (
        <div>loading</div>
      ) : error !== "" ? (
        <div>{error}</div>
      ) : (
        <div className="row">
          {renderedItems.length ? (
            <>
              {renderedItems.map((item, index) => {
                return (
                  <Card key={index} className="col-md-4 p-2 gap-2">
                    <h4>{item.rocket.rocket_name}</h4>
                    <p>Launch Date: {item.launch_date_utc}</p>
                    <p>Launch Status: {item.launch_success}</p>
                    <p>Upcoming: {item.upcoming}</p>
                  </Card>
                );
              })}
            </>
          ) : (
            <h2>Search Result Not Found. Please search again</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
