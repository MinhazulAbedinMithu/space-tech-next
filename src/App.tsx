import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchLaunches } from "./features/launch/launchSlice";
import moment from "moment";

function App() {
  const launch = useAppSelector((state) => state.launch);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);
  const { launches, loading, error } = launch;

  //Search Functionalities:
  const [searchText, setSearchText] = useState<string>("");
  const searchItems = launches.filter((item) =>
    item.rocket.rocket_name.toLowerCase().includes(searchText)
  );
  let renderedItems = searchText ? searchItems : launches;

  //Filtering Functionalities:
  const [filters, setFilters] = useState({
    launchDate: "",
    launchStatus: "",
    isUpcoming: "",
  });

  const filterByLastDate = (items: any, numOfType: number, dateType: any) => {
    const today = new Date();
    const startOfPrevType = moment(today)
      .subtract(numOfType, dateType)
      .startOf(dateType)
      .format("LLLL");
    const endOfPrevType = moment(today)
      .subtract(numOfType, dateType)
      .endOf(dateType)
      .format("LLLL");

    const filteredData = items.filter((item: any) =>
      moment(item.launch_date_utc).isBetween(startOfPrevType, endOfPrevType)
    );
    return filteredData;
  };

  const filterByLaunchStatus = (items: any, status: boolean | null) => {
    const filteredData = items.filter((item: any) => {
      return item.launch_success === status;
    });

    return filteredData;
  };
  const filteredByUpcoming = (items: any, status: boolean) => {
    const filteredData = items.filter((item: any) => {
      return item.upcoming === status;
    });

    return filteredData;
  };

  renderedItems =
    filters.launchDate === "last-week"
      ? filterByLastDate(renderedItems, 1, "week")
      : filters.launchDate === "last-month"
      ? filterByLastDate(renderedItems, 1, "month")
      : filters.launchDate === "last-year"
      ? filterByLastDate(renderedItems, 1, "year")
      : filters.launchDate === "last-5-year"
      ? filterByLastDate(renderedItems, 5, "year")
      : renderedItems;

  renderedItems =
    filters.launchStatus === "true"
      ? filterByLaunchStatus(renderedItems, true)
      : filters.launchStatus === "false"
      ? filterByLaunchStatus(renderedItems, null)
      : renderedItems;

  renderedItems =
    filters.isUpcoming === "true"
      ? filteredByUpcoming(renderedItems, true)
      : filters.isUpcoming === "false"
      ? filteredByUpcoming(renderedItems, false)
      : renderedItems;

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
        <div className="col-md-5">
          <h2>Filter Item</h2>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, launchDate: e.target.value })
            }
          >
            <option selected>Select Launch Date</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
            <option value="last-5-year">Last 5 Year</option>
          </select>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, launchStatus: e.target.value })
            }
          >
            <option selected>Select Launch Status</option>
            <option value="true">Success</option>
            <option value="false">Failure</option>
          </select>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) =>
              setFilters({ ...filters, isUpcoming: e.target.value })
            }
          >
            <option selected>Upcoming Status</option>
            <option value="true">Yes</option>
            <option value="false">Not</option>
          </select>
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
                    <p>
                      Launch Status: {item.launch_success ? "True" : "False"}
                    </p>
                    <p>Upcoming: {item.upcoming ? "True" : "False"}</p>
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
